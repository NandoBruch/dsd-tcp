const body = document.querySelector("body");

function renderMessages(doc) {
  let div = document.createElement("div");

  div.setAttribute("data-id", doc.id);
  div.textContent = doc.text;

  var ok = false;
  while (ok == false) {
    var min = 0;
    var max = body.clientWidth;
    var randomWidth = Math.floor(Math.random() * (+max - +min)) + +min;
    var min = 0;
    var max = body.clientHeight;
    var randomHeight = Math.floor(Math.random() * (+max - +min)) + +min;
    div.style.top = randomHeight;
    div.style.left = randomWidth;

    console.log("rh-> ", randomHeight, "rw-> ", randomWidth);

    body.addEventListener("DOMNodeInserted", (e) => {
      var possibleDistanceW = body.clientWidth - randomWidth;
      var targetW = e.target.clientWidth;
      var possibleDistanceH = body.clientHeight - randomHeight;
      var targetH = e.target.clientHeight;

      if (
        possibleDistanceW < targetW + 50 ||
        possibleDistanceH < targetH + 50 ||
        randomWidth < 50 ||
        randomHeight < 50
      ) {
        ok = false;
      } else {
        ok = true;
      }
    });

    body.appendChild(div);
  }

  div.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// db.collection("mensagem")
//   .where("status", "==", "ok")
//   .onSnapshot((snapshot) => {
//     let changes = snapshot.docChanges();
//     changes.forEach((change) => {
//       if (change.type == "added") {
//         renderMessages(change.doc);
//       } else if ((change.type = "removed")) {
//         let div = body.querySelector("[data-id=" + change.doc.id + "]");
//         body.removeChild(div);
//       }
//     });
//   });
