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
    namaDonasi: namaDonasi.value,
    danaDonasi: Number(danaDonasi.value),
    deskripsi: deskripsi.value,
    kategori: kategori.value,
    gambarDonasi: gambarDonasi.value
  })
    .then(() => { console.log('Data Successfully'); })
    .catch(error => { console.error(error) });
    document.getElementById("cardSection").innerHTML = '';
    readCampaign();
});


let template = null;
    $('.modal').on('show.bs.modal', function(event) {
      template = $(this).html();
    });

    $('.modal').on('hidden.bs.modal', function(e) {
      $(this).html(template);
    });

function createCampaign(namaDonasi, danaDonasi, deskripsi, kategori, gambarDonasi) {
  var campaign = {
    namaDonasi: namaDonasi,
    danaDonasi: danaDonasi,
    deskripsi: deskripsi,
    kategori: kategori,
    gambarDonasi: gambarDonasi
  }
  userCollection.add(campaign).then(() => {
    Swal.fire(
      'Sudah ditambahkan',
      'success'
    )
    
  })
}




function detailShow(id){
const database = firebase.firestore();
const userCollection = database.collection('Donasi');
userCollection.doc(id).get()
  .then(donasis => {
    donasi = donasis.data();
    if(donasis.exists)
    document.getElementById("detailSection").innerHTML += `

    <img class="card-img-top" src="${donasi.gambarDonasi}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${donasi.namaDonasi}</h5>
      <p class="card-text">Kategori: ${donasi.kategori}</p>
      <p class="card-text">Dana yang dibutuhkan : Rp.${donasi.danaDonasi}</p>
      <p class="card-text"><span class="data-deskripsi">Deskripsi : ${donasi.deskripsi}</span></p>
    </div>
  </div>
    
`
    else
      console.log('Campaign does not exist !');
    })
  .catch(error => {
    console.error(error);
  });
}

function readCampaign() {
  firebase.firestore().collection("Donasi").onSnapshot(function (snapshot) {
    document.getElementById("cardSection").innerHTML = '';
    snapshot.forEach(function (donasiValue) {
      var donasi = donasiValue.data();
      document.getElementById("cardSection").innerHTML += `
          <div class="column">
          <img class="card-img-top" src="${donasi.gambarDonasi}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${donasi.namaDonasi}</h5>
            <p class="card-text">Dana yang dibutuhkan : Rp.${donasi.danaDonasi}</p>
            <button type="button" id="detail-btn"  class="btn btn-success edit-donasi-btn" onclick="detailShow('${donasiValue.id}')" data-toggle="modal" data-target="#detailModal">Details</button>
            <button type="button" id="edit-donasi-btn"  class="btn btn-success edit-donasi-btn" data-toggle="modal" data-target="#editModal">Edit</button>
            <button type="submit" class="btn btn-success" onclick="deleteCamp('${donasiValue.id}')">Hapus</button>
          </div>
        </div>
            </div>
`

    });
  });
}

function deleteCamp(id){
  firebase.firestore().collection("Donasi").doc(id).delete().then(() => {
    console.log("data dihapus");
  });
}


$(document).on('click', '.edit-donasi-btn', function () {

  var nama = $(this).parent().find('.data-kategori').value;
  console.log(nama)


});

function EditCampaign() {
  firebase.firestore().collection("Donasi").onSnapshot(function (snapshot) {
    document.getElementById("cardSection").innerHTML = '';
    snapshot.forEach(function (donasiValue) {
      document.getElementById("cardSection").innerHTML += `
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

  const metadata = {
    contentType: file.type
  }

  const task = ref.child(name).put(file, metadata)

  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {

      alert("Image Upload Successful")
      const image = document.querySelector('#image')
      image.src = url
      document.getElementById("gambarDonasi").value = url

    })
}