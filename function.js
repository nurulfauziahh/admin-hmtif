const userId = document.getElementById('userId');
const namaDonasi = document.getElementById('namaDonasi');
const deskripsi = document.getElementById('deskripsi');
const kategori = document.getElementById('kategori');
const gambarDonasi = document.getElementById('gambarDonasi');
const danaDonasi = document.getElementById('danaDonasi');
const shortDeskripsi = document.getElementById('shortDeskripsi');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const readBtn = document.getElementById('readBtn');
const removeBtn = document.getElementById('removeBtn');


const database = firebase.firestore();
const userCollection = database.collection('Donasi');

addBtn.addEventListener('click', e => {
    e.preventDefault();
    const ID = userCollection.doc();
    ID.set({
        //type: 'admin'
        namaDonasi : namaDonasi.value,
        danaDonasi : Number(danaDonasi.value),
        deskripsi : deskripsi.value,
        kategori : kategori.value,
        gambarDonasi : gambarDonasi.value,
        shortDeskripsi : shortDeskripsi.value
    })
    .then(() => {console.log('Data Successfully');})
    .catch(error  => {console.error(error)});
});

updateBtn.addEventListener('click', e => {
    e.preventDefault();
    userCollection.doc(userId.value).update({
        namaDonasi : namaDonasi.value,
        danaDonasi : Number(danaDonasi.value),
        deskripsi : deskripsi.value,
        kategori : kategori.value,
        gambarDonasi : gambarDonasi.value,
        shortDeskripsi : shortDeskripsi.value
        //  type: 'normal'
    })
    .then(() => {console.log('Data Successfully');})
    .catch(error  => {console.error(error)});
});

removeBtn.addEventListener('click', e =>{
    e.preventDefault();
    userCollection.doc(userId.value).delete().then(() => {console.log('Data Successfully');})
    .catch(error  => {console.error(error)});
});

readBtn.addEventListener('click', e => {
    e.preventDefault();
    userCollection.get().then(snapshot => {
      snapshot.forEach(user => {
        console.log(user.id, ' => ', user.data());
      });
    })
    .catch(error => {
      console.error(error);
    });
  });


// const userId = document.getElementById('userId');
// const name = document.getElementById('name');
// const studentGpa = document.getElementById('studentGpa');
// const studentId = document.getElementById('studentId');
// const studyProgramId = document.getElementById('studyProgramId');
// const addBtn = document.getElementById('addBtn');
// const updateBtn = document.getElementById('updateBtn');
// const readBtn = document.getElementById('readBtn');
// const removeBtn = document.getElementById('removeBtn');


// const database = firebase.firestore();
// const userCollection = database.collection('data');

// addBtn.addEventListener('click', e => {
//     e.preventDefault();
//     const ID = userCollection.doc();
//     ID.set({
//         //type: 'admin'
//         name : name.value,
//         studentGpa : Number(studentGpa.value),
//         studentId : studentId.value,
//         studyProgramId : studyProgramId.value
//     })
//     .then(() => {console.log('Data Successfully');})
//     .catch(error  => {console.error(error)});
// });

// updateBtn.addEventListener('click', e => {
//     e.preventDefault();
//     userCollection.doc(userId.value).update({
//         name : name.value,
//         studentGpa : Number(studentGpa.value),
//         studentId : studentId.value,
//         studyProgramId : studyProgramId.value
//         //  type: 'normal'
//     })
//     .then(() => {console.log('Data Successfully');})
//     .catch(error  => {console.error(error)});
// });

// removeBtn.addEventListener('click', e =>{
//     e.preventDefault();
//     userCollection.doc(userId.value).delete().then(() => {console.log('Data Successfully');})
//     .catch(error  => {console.error(error)});
// });

// readBtn.addEventListener('click', e => {
//     e.preventDefault();
//     userCollection.doc(userId).get().then(() => {console.log('Data Successfully');})
//     .catch(error  => {console.error(error)});
// });