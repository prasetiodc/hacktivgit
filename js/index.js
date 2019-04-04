function listData(){
    $('#list').empty()

    // console.log('masuk pak eko')
    $.ajax({
        url: 'http://localhost:3000/users/star',
        method: 'GET',
        header: {Authorization : `token f31c4a8de853f7a288a9b8468bfbdc96e017d27b`}
    })
    .done(function(response){
        console.log(response)
        for(list of response){
            $('#list').append(`
            <li class="list-group-item">
            <a href="${list.clone_url}">${list.name}</a><br /><br />
                <btn type="submit" onclick='unStar("${list.name}","${list.owner.login}")'>Unstar<btn>
            </li>
            `)
        }
    })
    .fail(function(jqXHR, textStatus){
        console.log('request failed', textStatus);  
    })
}

function unStar(repo, owner){
    console.log(`http://localhost:3000/users/deleteStar/${owner}/${repo}`)

    // $('#list').empty()

    $.ajax({
        url: `http://localhost:3000/users/deleteStar/${owner}/${repo}`,
        method: 'DELETE',
        header: {Authorization : `token f31c4a8de853f7a288a9b8468bfbdc96e017d27b`}
    })
    .done(function(response){
        listData()
    })
    .fail(function(jqXHR, textStatus){
        console.log('request failed', textStatus);  
    })
}

function listDataUser(params){
    $('#list').empty()
    $.ajax({
        url: `http://localhost:3000/users/searchUserRepo/${params}`,
        method: 'GET',
        // header: {Authorization : `token f31c4a8de853f7a288a9b8468bfbdc96e017d27b`}
    })
    .done(function(response){
        console.log(response);
        for(list of response){
            $('#list').append(`<li class="list-group-item"><a href="${list.clone_url}">${list.name}</a></li>`)
        }
    })
    .fail(function(jqXHR, textStatus){
        console.log('request failed', textStatus);  
    })
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // $('column-right').html(<img scr="profile.getImageUrl()"></img>)

    const id_token = googleUser.getAuthResponse().id_token;

    $.post('http://localhost:3000/google-sign-in',{
        token:id_token
    })
    .done(response=>{
        console.log(response);
    })
    .fail(err=>{
        console.log(err.message)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

$(document).ready(function(){
    listData()
})


   
