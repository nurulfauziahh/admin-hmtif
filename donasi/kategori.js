
const database = firebase.firestore();
const userCollection = database.collection('Kategori');


$("#create-kategori-button").click(function(){
  var kategori = {
    namaKat: $("#namaKat").val(),
    gambarKat: $("#gambarKat").val(),

  }
  addKategori(kategori);
  console.log("berhasil ditambahkan");

});

function addKategori(h){
  firebase.firestore().collection("Kategori").add(h);
  
}

// Clear modal
let template = null;
    $('.modal').on('show.bs.modal', function(event) {
      template = $(this).html();
    });

    $('.modal').on('hidden.bs.modal', function(e) {
      $(this).html(template);
    });


// function detailShow(id){
// const database = firebase.firestore();
// const userCollection = database.collection('Donasi');
// userCollection.doc(id).get()
//   .then(donasis => {
//     donasi = donasis.data();
//     if(donasis.exists)
//     document.getElementById("detailSection").innerHTML += `
//     <img class="card-img-top" src="${donasi.gambarDonasi}" alt="Card image cap">
//     <div class="card-body">
//       <h4 class="card-title">${donasi.namaDonasi}</h4>
//       <p class="card-text kategori">${donasi.kategori}</p>
//       <p class="card-text dana">Dana yang dibutuhkan : Rp.${donasi.danaDonasi}</p>
//       <p class="card-text deskripsi">${donasi.deskripsi}</p>
//     </div>
//   </div>
    
// `
//     else
//       console.log('Campaign does not exist !');
//     })
//   .catch(error => {
//     console.error(error);
//   });
// }

function readKategori() {
  firebase.firestore().collection("Kategori").onSnapshot(function (snapshot) {
    document.getElementById("cardSection").innerHTML = '';
    snapshot.forEach(function (kategoriValue) {
      var kategori = kategoriValue.data();
      document.getElementById("cardSection").innerHTML += `
          <div class="column">
          <div clas="card">
          <img class="card-img-top" src="${kategori.gambarKat}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${kategori.namaKat}</h5>
            <p class="card-text gambar" style="display:none">${kategori.gambarKat}</p>
            <button type="button" id="detail-btn"  class="btn btn-success" onclick="detailShow('${kategoriValue.id}')" data-toggle="modal" data-target="#detailModal">Details</button>
            <button type="button" id="edit-kategori-btn" data-heroId="${kategoriValue.id}" class="btn btn-success edit-kategori-btn" data-toggle="modal" data-target="#editModal">Edit</button>
            <button type="submit" class="btn btn-success" onclick="deleteKat('${kategoriValue.id}')">Hapus</button>
          </div>
        </div>
            </div>
`

    });
  });
}

function deleteKat(id){
  firebase.firestore().collection("Kategori").doc(id).delete().then(() => {
    console.log("data dihapus");
  });
}


//belum
$(document).on('click', '.edit-kategori-btn', function(){
  var katId = $(this).attr('data-heroId');
  console.log("you click " + katId);
  $('#kategoriId').val(katId);

  var nama = $(this).parent().find('.card-title').text();
  $('#namaKatEdit').val(nama);

  var gambar = $(this).parent().find('.gambar').text();
  $('#gambarKatEdit').val(gambar);


});

//belum
$('#edit-kategori-button').click(function(){
  const database = firebase.firestore();
  const userCollection = database.collection('Kategori');
   const idKat = $('#kategoriId').val();
        userCollection.doc(idCamp).update({
          namaKat: $("#namaKatEdit").val(),
          gambarKat : $("#gambarKatEdit").val(),
        })
        .then(() => {console.log('Data Successfully');})
        .catch(error  => {console.error(error)});
  
});


function uploadImageKat() {
  const ref = firebase.storage().ref()

  const file = document.querySelector("#photoKat").files[0]

  const name = new Date() + '-' + file.name

  const metadata = {
    contentType: file.type
  }

  const task = ref.child(name).put(file, metadata)

  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {

      alert("Image Upload Successful")
      const image = document.querySelector('#imageKat')
      image.src = url
      document.getElementById("gambarKat").value = url

    })
}


function uploadImageEdit() {
  const ref = firebase.storage().ref()

  const file = document.querySelector("#photoEdit").files[0]

  const name = new Date() + '-' + file.name

  const metadata = {
    contentType: file.type
  }

  const task = ref.child(name).put(file, metadata)

  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(urlEdit => {

      alert("Image Upload Successful")
      const imageEdit = document.querySelector('#imageEdit')
      imageEdit.src = urlEdit
      document.getElementById("gambarKatEdit").value = urlEdit

    })
}