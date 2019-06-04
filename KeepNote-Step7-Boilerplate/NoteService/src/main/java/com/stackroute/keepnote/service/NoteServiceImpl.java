package com.stackroute.keepnote.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exception.NoteNotFoundExeption;
import com.stackroute.keepnote.model.Note;
import com.stackroute.keepnote.model.NoteUser;
import com.stackroute.keepnote.repository.KeepNoteRepository;
import com.stackroute.keepnote.repository.NoteRepository;

/*
* Service classes are used here to implement additional business logic/validation 
* This class has to be annotated with @Service annotation.
* @Service - It is a specialization of the component annotation. It doesn't currently 
* provide any additional behavior over the @Component annotation, but it's a good idea 
* to use @Service over @Component in service-layer classes because it specifies intent 
* better. Additionally, tool support and additional behavior might rely on it in the 
* future.
* */
@Service
public class NoteServiceImpl implements NoteService{

	/*
	 * Autowiring should be implemented for the NoteRepository and MongoOperation.
	 * (Use Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */
	private NoteRepository noteRepository;
	
	@Autowired
	private KeepNoteRepository keepNoteRepository;
	
	@Autowired
	public NoteServiceImpl(NoteRepository noteRepository) {
		this.noteRepository = noteRepository;
	}
	/*
	 * This method should be used to save a new note.
	 */
	public boolean createNote(Note note) {
		
		int count = 1;
		NoteUser noteUser = new NoteUser();
		List<Note> notes = new ArrayList<>();
		note.setNoteCreationDate(new Date());
		if (noteRepository.existsById(note.getNoteCreatedBy())) {
			notes = noteRepository.findById(note.getNoteCreatedBy()).get().getNotes();
			Iterator iterator = notes.iterator();
			Note note1 = new Note();
			while (iterator.hasNext()) {

				note1 = (Note) iterator.next();
			}
			note.setNoteId(note1.getNoteId() + count);
			notes.add(note);
			noteUser.setUserId(note.getNoteCreatedBy());
			noteUser.setNotes(notes);
			if (noteRepository.save(noteUser) != null) {
				return true;
			}
		} else { 
			note.setNoteId(count);
			notes.add(note);
			noteUser.setUserId(note.getNoteCreatedBy());
			noteUser.setNotes(notes);

			if (noteRepository.insert(noteUser) != null) {
				return true;
			}
		}
		return false;
	}
	
	/* This method should be used to delete an existing note. */

	
	public boolean deleteNote(String userId, int noteId) {
//		NoteUser noteUser = new NoteUser();
//		List<Note> noteDelete = new ArrayList<Note>();
		NoteUser noteUser = noteRepository.findById(userId).get();
//		List<Note> notes = noteUser.getNotes();
		List<Note> noteFound = noteUser.getNotes()
									.stream().filter(note -> note.getNoteId() == noteId )
									.collect(Collectors.toList());
//		noteDelete.add(noteFound);
		
		if(noteUser != null && noteFound != null) {
			noteUser.setNotes(noteFound);
			noteRepository.delete(noteUser);
			return true;
		}
		return false;
	}
	
	/* This method should be used to delete all notes with specific userId. */

	
	public boolean deleteAllNotes(String userId) {
		
		if(noteRepository.findById(userId).get() != null) {
			noteRepository.delete(noteRepository.findById(userId).get());
			return true;
		}
		return false;
	}

	/*
	 * This method should be used to update a existing note.
	 */
	public Note updateNote(Note note, int id, String userId) throws NoteNotFoundExeption {
		try {
			NoteUser noteUser = noteRepository.findById(userId).get();
			Note notedata = getNoteByNoteId(userId, id);
			List<Note> notes = new ArrayList<Note>();
			notes.add(notedata);
			noteUser.setNotes(notes);
			noteRepository.save(noteUser);
			return notedata;
			
		}catch(Exception e) {
			throw new NoteNotFoundExeption("Note not found");
		}
		
	}

	/*
	 * This method should be used to get a note by noteId created by specific user
	 */
	public Note getNoteByNoteId(String userId, int noteId) throws NoteNotFoundExeption {
		Optional<Note> note = null;
		try {
		NoteUser noteUser = noteRepository.findById(userId).get();
		List<Note> notes = noteUser.getNotes();
		
		if(noteUser != null && notes != null) {
			note = notes.stream().filter(noteData -> noteData.getNoteId() == noteId )
					.findFirst();
		}
		
		}catch(Exception e) {
			throw new NoteNotFoundExeption("Note not found");
		}
		return note.orElseThrow(() -> new NoteNotFoundExeption("Note not found"));
	}

	/*
	 * This method should be used to get all notes with specific userId.
	 */
	public List<Note> getAllNoteByUserId(String userId) {
		
		return noteRepository.findById(userId).get().getNotes();
	}

}
