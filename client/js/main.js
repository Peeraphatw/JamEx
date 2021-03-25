const myform = document.querySelector("#myform");
const baseURL = "http://53e0e8537a48.ngrok.io";
myform.addEventListener("submit", (e) => {
  e.preventDefault();
  data = new FormData(myform);
  let jsonData = {};
  for (var [key, value] of data.entries()) {
    jsonData[key] = value;
  }
  fetch(`${baseURL}/member/`, {
    method: "POST",
    body: JSON.stringify(jsonData),
    headers: { "Content-type": "application/json" },
  })
    .then((data) => data.json())
    .then((data) => {
      loadmember();
      myform.reset();
    })
    .catch((err) => console.log(err));
});

const loadmember = () => {
  fetch(`${baseURL}/member`, { method: "GET" })
    .then((data) => data.json())
    .then((data) => contentRender(data.data))
    .catch((err) => console.log(err));
};

loadmember();

const deleteMember = (e) => {
  console.log(swal);
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this member!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      fetch(`${baseURL}/member/${e.value}`, { method: "DELETE" })
        .then((data) => data.json())
        .then((data) => {
          swal("Poof! Your member has been deleted!", {
            icon: "success",
          });
          loadmember();
        })
        .catch((err) => console.log(err));
    } else {
      swal("Your member is safe!");
    }
  });
};
const contentRender = (data) => {
  const content = document.getElementById("content");
  content.innerHTML = "";
  data.forEach((data) => {
    content.innerHTML += `<tr><td>${data.username}</td>
    <td>${data.password}</td>
    <td>${data.email}</td>
    <td>${data.fullname}</td>
    <td><button class="red ui button" value="${data._id}" onclick="deleteMember(this)" type="button">Delete</button></td>
    </tr>`;
  });
};
