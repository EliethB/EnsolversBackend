const connection = require("../database/database");
const { validationResult } = require("express-validator");

const getNotes = (req, res) => {
  connection.query(
    "SELECT notes.id, notes.description, notes.number, notes.id_state, categories.id AS category_id, categories.nameCategory AS category FROM notes LEFT JOIN categories ON notes.id_category = categories.id",
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener las notas" });
        return;
      }
      res.json(results);
    }
  );
};
const postNote = (req, res) => {
  const description = req.body.description;
  let number = req.body.number || null;
  
  if (!description) {
    return res
      .status(400)
      .json({ error: "Falta el campo obligatorio: descripción" });
  }
  const id_state = 1;

  connection.query(
    "INSERT INTO notes(description, number, id_state) VALUES (?, ?, ?)",
    [description, number, id_state],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al agregar la nota", err });
      } else {
        res.json("Nota agregada con éxito");
      }
    }
  );
};

const updateNote = (req, res) => {
  const errors = validationResult(req);


  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = req.params.id;
  const { description, number, id_state } = req.body;

  connection.query(
    "UPDATE notes SET description=?, number=?, id_state=? WHERE id=?",
    [description, number, id_state, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error interno del servidor" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Nota no encontrada" });
      }

      res.json({ message: "Nota editada correctamente" });
    }
  );
};

const deleteNote = (req, res) => {
  const id = req.params.id;

  connection.query("DELETE FROM notes WHERE id=?", [id], (err, results) => {
  
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Error eliminando la nota" });
    } else {
      if (results.affectedRows > 0) {
        res.json("Nota eliminada exitosamente");
      } else {
        res.status(404).json({ error: "Nota no encontrada" });
      }
    }
  });
};
const updateNoteState = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = req.params.id;
  const { id_state, number } = req.body;

  connection.query(
    "UPDATE notes SET id_state=?, number=? WHERE id=?",
    [id_state, number, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error interno del servidor" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Nota no encontrada" });
      }
      res.json({ message: "Estado de la nota actualizado correctamente" });
    }
  );
};

const updateNoteNumber = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = req.params.id;
  const { new_number, current_number } = req.body;

 
  connection.query(
    "SELECT id FROM notes WHERE number=? AND id != ? AND id_state = (SELECT id_state FROM notes WHERE id = ?)",
    [new_number, id, id],
    (err, existingResults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error interno del servidor" });
      }

     
      if (existingResults.length > 0) {
        const existingIds = existingResults.map((result) => result.id);
        connection.query(
          "UPDATE notes SET number=? WHERE id IN (?)",
          [current_number, existingIds],
          (updateErr, updateResults) => {
            if (updateErr) {
              console.error(updateErr);
              return res
                .status(500)
                .json({ error: "Error interno del servidor" });
            }
          }
        );
      }
    }
  );

  connection.query(
    "UPDATE notes SET number=? WHERE id=?",
    [new_number, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error interno del servidor" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Nota no encontrada" });
      }
      res.json({ message: "Estado de la nota actualizado correctamente" });
    }
  );
};

const partnerNewCategoryANote = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = req.params.id;
  const { id_category } = req.body;

  console.log(id_category);
  connection.query(
    "UPDATE notes SET id_category = ? WHERE id = ? ",
    [id_category, id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error interno del servidor" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Nota no encontrada" });
      }
      res.json({ message: "Estado de la nota actualizado correctamente" });
    }
  );
};

module.exports = {
  getNotes,
  postNote,
  updateNote,
  deleteNote,
  updateNoteState,
  updateNoteNumber,
  partnerNewCategoryANote,
};
