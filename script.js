// Funções do Modal
function openModal() {
    document.getElementById("modal-form").style.display = "block";
}

function closeModal() {
    document.getElementById("modal-form").style.display = "none";
}

// Fechar modal se clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById("modal-form");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Lógica do Formulário
const form = document.getElementById('lead-form');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o recarregamento da página

    const btn = document.getElementById('btnSubmit');
    const originalText = btn.innerText;
    btn.innerText = "Enviando...";
    btn.disabled = true;

    // Captura os dados
    const data = {
        Nome: document.getElementById('nome').value,
        Whatsapp: document.getElementById('whatsapp').value,
        Status: document.getElementById('status').value,
        Advogado: document.getElementById('advogado').value,
        Origem: document.getElementById('origem').value,
        Data: new Date().toLocaleString('pt-BR')
    };

    // Envia para o Sheet.best (Google Sheets)
    // ATENÇÃO: Substitua a URL abaixo pela sua URL do Sheet.best
    fetch('https://sheet.best/api/sheets/SUA_URL_AQUI', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            // SUCESSO!
            
            // 1. Dispara evento de conversão do Google/Facebook (se tiver)
            // gtag('event', 'conversion', {...}); 

            // 2. Redireciona para o PDF ou Página de Obrigado
            // Opção A: Redirecionar direto para o PDF
            // window.location.href = "URL_DO_SEU_PDF_NO_DRIVE_OU_NETLIFY.pdf";
            
            // Opção B: Redirecionar para página de obrigado (Recomendado)
            alert("Sucesso! Vamos te redirecionar para o download.");
            window.location.href = "/obrigado.html"; 
        } else {
            throw new Error('Erro na requisição');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Houve um erro ao enviar. Tente novamente ou chame no WhatsApp.');
        btn.innerText = originalText;
        btn.disabled = false;
    });
});