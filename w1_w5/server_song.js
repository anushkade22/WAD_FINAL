const express = require('express');
const mongoose = require('mongoose');
//const exphbs = require('express-handlebars');
// Create the Express app
//const app = express();
const port = 3000; // Change the port number if needed

// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');


//middle-ware for proper parsing
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/music', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Define the Song schema
const songSchema = new mongoose.Schema({
  songname: String,
  film: String,
  music_director: String,
  singer: String,
  actor: String,
  actress: String
});

// Create the Song model
const Song = mongoose.model('Song', songSchema);

// Define routes

// Create a new song
app.post('/song', (req, res) => {
  const songData = req.body;
  Song.create(songData)
    .then(() => {
      res.send('Song created successfully');
    })
    .catch((error) => {
      res.status(500).send('Error creating song');
    });
});

//to get the songs data
app.get('/songs', (req, res) => {
  Song.find()
    .then((songs) => {
      const formattedSongs = songs.map((song) => ({
        Songname: song.songname,
        Film: song.film,
        Music_director: song.music_director,
        singer: song.singer,
        actor: song.actor,
        actress: song.actress
      }));
      res.json(formattedSongs);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving songs' });
    });
});

// Get the total count of songs and list all songs
// app.get('/', (req, res) => {
//   Song.find()
//     .then((songs) => {
//       const totalCount = songs.length;
//       const formattedSongs = JSON.stringify(songs, null, 2);
//       res.send(`Total songs: ${totalCount}\n\n${formattedSongs}`);
//       //res.send(`Total songs: ${totalCount}\n\n${songs}`);
//     })
//     .catch((error) => {
//       res.status(500).send('Error retrieving songs');
//     });
// });
// app.get('/', (req, res) => {
//   Song.find()
//     .then((songs) => {
//       const totalCount = songs.length;
//       res.render('songs', { totalCount, songs });
//     })
//     .catch((error) => {
//       res.status(500).send('Error retrieving songs');
//     });
// });


// Get songs by a specific music director
app.get('/songs/musicdirector/:director', (req, res) => {
  const director = req.params.director;
  Song.find({ music_director: director })
    .then((songs) => {
      res.send(songs);
    })
    .catch((error) => {
      res.status(500).send('Error retrieving songs');
    });
});

// Get songs by a specific music director and singer
app.get('/songs/musicdirector/:director/singer/:singer', (req, res) => {
  const director = req.params.director;
  const singer = req.params.singer;
  Song.find({ music_director: director, singer: singer })
    .then((songs) => {
      res.send(songs);
    })
    .catch((error) => {
      res.status(500).send('Error retrieving songs');
    });
});

// Delete a song by ID
app.delete('/songs/:id', (req, res) => {
  const songId = req.params.id;
  Song.findByIdAndDelete(songId)
    .then(() => {
      res.send('Song deleted successfully');
    })
    .catch((error) => {
      res.status(500).send('Error deleting song');
    });
});

// Add actor and actress names to a song
app.put('/song/:id', (req, res) => {
  const songId = req.params.id;
  const { actor, actress } = req.body;
  console.log(req.body)
  Song.findByIdAndUpdate(songId, { actor, actress })
    .then(() => {
      res.send('Song updated successfully');
    })
    .catch((error) => {
      res.status(500).send('Error updating song');
    });
});

//table
// app.get('/', (req, res) => {
//   Song.find()
//     .then((songs) => {
//       const totalCount = songs.length;

//       // Create an HTML table to display the data
//       let tableHTML = '<table>';
//       tableHTML += '<tr><th>Song Name</th><th>Film Name</th><th>Music Director</th><th>Singer</th><th>Actor</th><th>Actress</th></tr>';

//       // Iterate through the songs and add each row to the table
//       songs.forEach((song) => {
//         tableHTML += `<tr><td>${song.songname}</td><td>${song.film}</td><td>${song.music_director}</td><td>${song.singer}</td><td>${song.actor}</td><td>${song.actress}</td></tr>`;
//       });

//       tableHTML += '</table>';

//       // Send the table HTML as the response
//       res.send(`<h2>Total songs: ${totalCount}</h2>${tableHTML}`);
//     })
//     .catch((error) => {
//       res.status(500).send('Error retrieving songs');
//     });
// });

app.get('/', (req, res) => {
  Song.find()
    .then((songs) => {
      const totalCount = songs.length;

      // Create an HTML table to display the data
      let tableHTML = '<table>';
      tableHTML += '<tr><th>Song Name</th><th>Film Name</th><th>Music Director</th><th>Singer</th><th>Actor</th><th>Actress</th></tr>';

      // Iterate through the songs and add each row to the table
      songs.forEach((song) => {
        tableHTML += `<tr><td>${song.songname}</td><td>${song.film}</td><td>${song.music_director}</td><td>${song.singer}</td><td>${song.actor}</td><td>${song.actress}</td></tr>`;
      });

      tableHTML += '</table>';

      // Send the count and table HTML as the response
      res.send(`<h2>Total songs: ${totalCount}</h2>${tableHTML}`);
    })
    .catch((error) => {
      res.status(500).send('Error retrieving songs');
    });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

