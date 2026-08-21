
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();


    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {

        const resposta = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                senha
            })
        });


        const json = await resposta.json();


        if (resposta.ok) {

            localStorage.setItem("token", json.token);
            alert("Login realizado");
            window.location.href = "../home.html";
        } else {

            alert(json.message);
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
    }
});