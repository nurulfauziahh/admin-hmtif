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
const gambar = document.getElementById("gambar");

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
        gambarDonasi : gambarDonasi.value
    })
    .then(() => {console.log('Data Successfully');})
    .catch(error  => {console.error(error)});
});


function createCampaign(namaDonasi, danaDonasi, deskripsi, kategori, gambarDonasi) {
    var campaign={
        namaDonasi : namaDonasi,
        danaDonasi: danaDonasi,
        deskripsi : deskripsi,
        kategori: kategori,
        gambarDonasi : gambarDonasi
    }
    userCollection.add(campaign).then(()=> {
        Swal.fire(
            'Sudah ditambahkan',
            'success'
        )
        document.getElementById("cardSection").innerHTML='';
        readCampaign();
    })
}

document.getElementById("addBtn").addEventListener('click', e => {
    e.preventDefault();
    const ID = userCollection.doc();
    ID.set({
        //type: 'admin'
        namaDonasi : namaDonasi.value,
        danaDonasi : Number(danaDonasi.value),
        deskripsi : deskripsi.value,
        kategori : kategori.value,
        gambarDonasi : gambarDonasi.value
    })
    .then(() => {console.log('Data Successfully');})
    .catch(error  => {console.error(error)});
});

function readCampaign() {
    firebase.firestore().collection("Donasi").onSnapshot(function(snapshot){
        document.getElementById("cardSection").innerHTML='';
        snapshot.forEach(function(donasiValue) {
          var donasi = donasiValue.data();
            document.getElementById("cardSection").innerHTML +=`
            <div class="card" style="width: 22rem;">
  <img class="card-img-top" src="${donasi.gambarDonasi}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title" ><span id="data-nama">${donasi.namaDonasi}</span></h5>
    <p class="card-text"><span class="data-deskripsi">${donasi.deskripsi}</span></p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"><span id="data-dana">${donasi.danaDonasi}</span></li>
    <li class="list-group-item data-kategori" id="data-kategori">${donasi.kategori}</li>
    <li class="list-group-item"><span id="data-gambar">${donasi.gambarDonasi}</span></li>
  <div class="card-body">
    <button type="button" id="edit-donasi-btn"  class="btn btn-success edit-donasi-btn" data-toggle="modal" data-target="#editModal">Edit Me!!</button>
    <button type="button" class="btn btn-success" onclick"deleteDonasi('${donasi.userId}')">Hapus</button>
  </div>
</div><br>
`

        });
    });
}




function EditCampaign() {
    firebase.firestore().collection("Donasi").onSnapshot(function(snapshot){
        document.getElementById("cardSection").innerHTML='';
        snapshot.forEach(function(donasiValue) {
            document.getElementById("cardSection").innerHTML +=`
            <a href="#myModal" class="btn btn-info btn-lg" data-toggle="modal" data-code="code" data-company="company name">
  Show Modal
</a>

  <div class="modal fade bs-example-modal-sm" tabindex="-1" id="myModal">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
        <h4 class="modal-title" id="mySmallModalLabel">Codes & Company</h4>
      </div>
      <div class="modal-body">
        <input type="text" id="${donasiValue.data().namaDonasi}" value="${donasiValue.data().namaDonasi}" class="form-control" />
        <input type="text" id="${donasiValue.data().danaDonasi}" value="${donasiValue.data().danaDonasi}" class="form-control" />
      </div>
    </div>
  </div>
</div>
`

        });
    });
}




  function uploadImage() {
    const ref = firebase.storage().ref()

    const file = document.querySelector("#photo").files[0]

    const name = new Date() + '-' + file.name

    const metadata  = {
      contentType:file.type
    }

    const task  = ref.child(name).put(file,metadata)

    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url =>{
      
      alert("Image Upload Successful")
      const image = document.querySelector('#image')
      image.src = url
      document.getElementById("gambarDonasi").value = url
      
    })
  }