
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

$('#edit-newhero-button').click(function(){
  const database = firebase.firestore();
  const userCollection = database.collection('Aspirasi');
   const idAsp = $('#heroId').val();
        userCollection.doc(idAsp).update({
          name: $("#inputNamaAspirasiEdit").val(),
          deskripsi: $("#inputDeskripsiEdit").val(),
          jumlahLike: 0,
          isEnable: false,
        })
        .then(() => {console.log('Data Successfully');})
        .catch(error  => {console.error(error)});
  
});

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
          <p class="card-text">${aspirasi.deskripsi}</p>
          <button type="button" id="edit-donasi-btn" data-heroId="${aspirasiValue.id}" class="btn btn-success edit-donasi-btn" data-toggle="modal" data-target="#editModal">Edit</button>
          <button type="submit" class="btn btn-success" onclick="deleteAsp('${aspirasiValue.id}')">Hapus</button>
        </div>
      </div>
      </div>
            
`

    });
  });
}

$(document).on('click', '.edit-donasi-btn', function(){
  var heroId = $(this).attr('data-heroId');
  $('#heroId').val(heroId);
  console.log("you click " + heroId);
  var nama = $(this).parent().find('.card-title').text();
  var nama2 = $(this).parent().find('.card-text').text();
  $('#inputNamaAspirasiEdit').val(nama);
  $('#inputDeskripsiEdit').val(nama2);

});