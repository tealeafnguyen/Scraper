window.onload = function () {
  getArticles();
}

function getArticles() {
  console.log('boops')
  $.ajax({
    method: "GET",
    url: "/articles"
  })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        $("#articles").append(`<div class="art">
          <center>
          <p data-id=${data[i]._id}> ${data[i].title} <br/>  <a href=${data[i].link}> ${data[i].link}</a></p>
          <p>${data[i].summary}</p>
          <button class="note" data-id=${data[i]._id} style="display:inline-block">Note</button>
          <button class="save" data-id=${data[i]._id} style="display:inline-block">Save</button>
          </center>
          </div>
          `);
      }
    });
}


$(document).on('click', '.scrape', function () {
  var thisId = $(this).attr("data-id");
  $("#notes").empty();
  $.ajax({
    method: "DELETE",
    url: "/delete"
  }).then(function (res) {
    $('#articles').empty();
  })

  $.ajax({
    method: "GET",
    url: "/scrape/" + thisId
  })
    .then(function (data) {
      console.log(data);
      $.getJSON("/articles", function (data) {
        for (var i = 0; i < data.length; i++) {
          $("#articles").append(`<div class="art">
          <center>
          <p data-id=${data[i]._id}> ${data[i].title} <br/>  <a href=${data[i].link}> ${data[i].link}</a></p>
          <p>${data[i].summary}</p>
          <button class="note" data-id=${data[i]._id} style="display:inline-block">Note</button>
          <button class="save" data-id=${data[i]._id} style="display:inline-block">Save</button>
          </center>
          </div>
          `);
        }
      });
    });
})

$(document).on('click', '.saved', showSaved)

function showSaved() {
  $("#notes").empty();
  $('#articles').empty();
  $.ajax({
    method: "GET",
    url: "/saved"
  })
    .then(function (data) {
      console.log(data);
      $.getJSON("/saved", function (data) {
        for (var i = 0; i < data.length; i++) {
          $("#articles").append(`
          <div class="art">
          <center>
          <p data-id=${data[i]._id}> ${data[i].title} <br/>  <a href=${data[i].link}> ${data[i].link}</a></p>
          <p>${data[i].summary}</p>
          <button class="noteSaved" data-id=${data[i]._id} style="display:inline-block">Note</button>
          <button class="delete" data-id=${data[i]._id} style="display:inline-block">delete</button>
          </center>
          </div>
          `);
        }
      });
    });
}

$(document).on('click', '.clear', function () {
  $.ajax({
    method: "DELETE",
    url: "/delete"
  }).then(function (res) {
    $('#articles').empty();
    $("#notes").empty();
    console.log(res)
  })
})

$(document).on("click", ".save", function () {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function (res) {
      console.log("Saving: " + res);
      $.ajax({
        method: "POST",
        url: "/saveArticles/" + thisId,
        data: res
      })

    });
})


$(document).on("click", ".note", function () {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");
  console.log(thisId)

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function (data) {
      console.log(data);
      $("#notes").append("<h2>" + data.title + "</h2>");
      $("#notes").append("<input id='titleinput' name='title' >");
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});

$(document).on("click", ".noteSaved", function () {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");
  console.log(thisId)

  $.ajax({
    method: "GET",
    url: "/articlesSaved/" + thisId
  })
    .then(function (data) {
      console.log(data);
      $("#notes").append("<h2>" + data.title + "</h2>");
      $("#notes").append("<input id='titleinput' name='title' >");
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append("<button data-id='" + data._id + "' id='savenoteS'>Save Note</button>");
      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});

$(document).on('click', '.delete', function () {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "DELETE",
    url: "/deleteSaved/" + thisId,
  }).then(function (res) {
    console.log(res);
    showSaved();
  })
});

$(document).on("click", "#savenote", function () {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  }).then(function (data) {
    console.log(data);
    $("#notes").empty();
  });
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#savenoteS", function () {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articlesSaved/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  }).then(function (data) {
    console.log(data);
    $("#notes").empty();
  });
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
