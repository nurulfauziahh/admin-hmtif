
const database = firebase.firestore();
const userCollection = database.collection('Donasi');

$("#create-newhero-button").click(function(){
  var aspirasi = {
    name: $("#inputNamaAspirasi").val(),
    deskripsi: $("#inputDeskripsi").val(),
    jumlahLike: 0,
    isEnable: false,

  }
  addAspirasi(aspirasi);

});

function addAspirasi(h){
  firebase.firestore().collection("Aspirasi").add(h);
  
}

function deleteAsp(id){
  firebase.firestore().collection("Aspirasi").doc(id).delete().then(() => {
    console.log("data dihapus");
  });
}


function readAsp() {
  firebase.firestore().collection("Aspirasi").onSnapshot(function (snapshot) {
    document.getElementById("cardSection").innerHTML = '';
    snapshot.forEach(function (aspirasiValue) {
      var aspirasi = aspirasiValue.data();
      document.getElementById("cardSection").innerHTML += `

      <div class="column col-md-6">
      <div class="card" style="width: 36rem;">
        <div class="card-body">
          <h5 class="card-title">${aspirasi.name}</h5>
          <p class="card-text">Deskripsi : ${aspirasi.deskripsi}</p>
          <button type="button" id="edit-donasi-btn"  class="btn btn-success edit-donasi-btn" data-toggle="modal" data-target="#editModal">Edit</button>
          <button type="submit" class="btn btn-success" onclick="deleteAsp('${aspirasiValue.id}')">Hapus</button>
        </div>
      </div>
      </div>
            
`

    });
  });
}

