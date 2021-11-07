function Clone(element){
    return document.querySelector(element);
}
function CloneAll(elements){
    return document.querySelector(elements);
}

let seuVotoPara = Clone('.d-1--1 span');
let cargo = Clone('.d-1--2 span');
let descricao = Clone('.d-1--4');
let aviso = Clone('.d-2');
let lateral = Clone('.d-1--right');
let numeros = Clone('.d-1--3');

let etapaAtual = 0;
let numero = '';
let branco = false;
let votos = [];

function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero='';
    branco=false;

    for(let i=0; i < etapa.numeros; i++){
        if(i === 0){
            numeroHtml += '<span class="numero pisca"></span>';
        } else {
            numeroHtml += '<span class="numero"></span>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
function AtualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `
            Nome: ${candidato.nome}<br/>
            Partido: ${candidato.partido}
        `;

        let fotosHTML = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHTML += `
                    <div class="d-1--img small">
                        <img src="./images/${candidato.fotos[i].url}" alt="Image Prefeito">
                        ${candidato.fotos[i].legenda}
                    </div>
                `;
            } else {
                fotosHTML += `
                    <div class="d-1--img">
                        <img src="./images/${candidato.fotos[i].url}" alt="Image Prefeito">
                        ${candidato.fotos[i].legenda}
                    </div>
                `;
            }
        }
        lateral.innerHTML = fotosHTML;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `
            <div class="aviso--grande pisca">VOTO NULO</div>
        `;
    }

}

function Click(element){
    let elNumero = Clone('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = element;
        numero = `${numero}${element}`;
        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            AtualizaInterface();
        }
    }   
}
function Branco(){
    if(numero == ''){
        branco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = `
            <div class="aviso--grande pisca">VOTO EM BRANCO</div>
        `;
    } else {
        alert('Para votar em BRANCO, não pode ter digitado nenhum número!');
    }
}
function Corrige(){
    comecarEtapa();
}
function Confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(branco == true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco',
        });
    } else if(numero.length === etapa.numeros ){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero,
        });
    }
    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else {
            Clone('.tela').innerHTML= `
                <div class="aviso--gigante pisca">FIM</div>
            `;
            console.log(votos);
        }
    }
}
comecarEtapa();