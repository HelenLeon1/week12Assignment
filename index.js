
/* Week 12 Assignment */


const url = "http://localhost:3000/survey";

$.get(url).then(data => {   
    data.map(user => {  //maps over data returned and for every user it executes this function
      $('#surveyData').append( //appends the template literal to the div with surveyData id
        $(`
        <div class="accordion-item" id="${user.id}">
            <h2 class="accordion-header" id="heading">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${user.id}" aria-expanded="true" aria-controls="collapse${user.id}">
                    ${user.fullName}'s Favorite Things
                </button>
            </h2>
            <div id="collapse${user.id}" class="accordion-collapse collapse" aria-labelledby="heading" >
                <div class="accordion-body">
                    <ul class="list-group">
                        <li class="list-group-item">Favorite Hobby: ${user.hobby}</li>
                        <li class="list-group-item">Favorite Song: ${user.song}</li>
                        <li class="list-group-item">Favorite Food: ${user.food}</li>
                        <li class="list-group-item">Id: ${user.id}</li>
                    </ul>
                </div>
                <div class="mb-3 text-center">
                    <button class="btn btn-danger mb-2" onClick="deleteUser(${user.id})">Delete</button>
                </div>
            </div>
        </div>
        `)
        )
    })
  })



  //when a user clicks on the submit button it will get the values using the val() jquery method and use the post method to create the data
  $('#submitButton').on('click', () => {
        $.post(url, {       
            fullName: $('#fullName').val(),
            hobby: $('#hobby').val(),
            song: $('#song').val(),
            food: $('#food').val()
        })
  })



//deletes a specific user by targeting the id that is passed as an argument when the user clicks on the delete button
  function deleteUser(id) {
    $.ajax({
      url: `${url}/${id}`,
      method: 'DELETE',
    })
  }


//updates a specific user by targeting the user's id and using the ajax and put method to update the data with the object below
function updateUser() {
    let id= $('#update-id').val()

   $.ajax(`${url}/${id}`, {
    method: 'PUT',
    data: {
      fullName: $('#update-name').val(), 
      hobby: $('#update-hobby').val(),
      song: $('#update-song').val(),
      food: $('#update-food').val(),
      id: $('#update-id').val(),
      }
  })
}


  $('#update-button').on('click', updateUser); 