const backend_base_url = "";
const frontend_base_url = "";

async function handleSignin(){
    var id = document.getElementById("id").value;
    var username = document.getElementById("username").value;
    var pw = document.getElementById("pw").value;
    var pw2 = document.getElementById("pw2").value;

    const signupData = {
        id : document.getElementById("id").value,
        username: document.getElementById("username").value,
        pw: document.getElementById("pw").value,
        pw2: document.getElementById("pw2").value,
    }

    if(id.length<4 || id.length>=20) alert("id를 4~20자로 입력해주세요.");
    else if(pw.length<4 || pw2.length<4) alert("비밀번호를 4자 이상 입력해주세요.");
    else if(pw!==pw2) alert("비밀번호가 일치하지 않습니다.");
    else{
    const response = await fetch(`${backend_base_url}/users/`,{
        headers:{
            'Content-type' : 'application/json'
        },
        method:'POST',
        body:JSON.stringify(signupData)
    }
    )

    response_json = await response.json()

    if(response.status == 200 ){
        window.location.replace(`${fronted_base_url}/login.html`);
    }
    else{
        alert(response.status)
    }
    }
}

async function handleLogin(){
    console.log("handle login")

    const loginData={
        id: document.getElementById("id").value,
        password: document.getElementById("pw").value,
    }

    const response = await fetch(`${backend_base_url}/users/api/token`,{
        headers:{
            'Content-type': 'application/json'
        },
        method: 'POST',
        body:JSON.stringify(loginData)
    })

    response_json=await response.json()
    console.log(response_json.access)

    if(response.status == 200){
        localStorage.setItem("access",response_json.access)
        localStorage.setEtem("refresh",response_json.refresh)

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c){
            return '%' + ('00'+c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);
        window.location.replace(`${frontend_base_url}/Mypage.html`);
    }else{
        alert(response.status)
    }

}

// async function handleLogout(){

// }