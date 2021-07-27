import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { ProfileSideBar } from '../src/components/ProfileSideBar';

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {propriedades.items.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={`/users/${itemAtual.login}`} >
                <img src={`${itemAtual.html_url}.png`} />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          )
        }).slice(0, 6)}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'celsorgjr';

  const [githubLogin, setgithubLogin ] = React.useState([]);
  const [pessoasFavoritas, setpessoasFavoritas] = React.useState([]);
  const [seguidores, setSeguidores] = React.useState([]);
  const [comunidades, setComunidades] = React.useState([]);
  React.useEffect(function(){
    fetch(`https://api.github.com/users/${githubUser}`)
    .then(function(respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function(respostacompleta) {
      setgithubLogin(respostacompleta);
    })
    fetch(`https://api.github.com/users/${githubUser}/following`)
    .then(function(respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function(respostacompleta) {
      setpessoasFavoritas(respostacompleta);
    })
    fetch(`https://api.github.com/users/${githubUser}/followers`)
    .then(function(respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function(respostacompleta) {
      setSeguidores(respostacompleta);
    })
    fetch('https://graphql.datocms.com/', {
        method: 'Post',
        headers: {
          'Authorization' : 'e535fd673de461a14aacbb8b367172',
          'Content-Type' : 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ "query": `query {
          allCommunities {
            id
            title
            imageUrl
            createSlug
          }
        }` })
    })
    .then((response) => response.json())
    .then((respostacompleta) => {
      setComunidades(respostacompleta.data.allCommunities)
    })
  }, [])

  
  return (
    <>
    <AlurakutMenu />
    <MainGrid>
      <div className="profileArea" style={{gridArea: 'profileArea'}}>
        <ProfileSideBar user={githubUser} />
      </div>
      <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
        <Box>
          <h1 className="title">
            Bem vindo (a) {githubLogin.name}
          </h1>

          <OrkutNostalgicIconSet mensagens="1200" fas="500" fotos="10" recados="12" />
        </Box>

        <Box>
          <h2 className="subTitle">O que voce deseja fazer?</h2>
          <form onSubmit={function handleCriaComunidade(e){
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('imageUrl'),
                createSlug: githubUser
              };

              fetch('/api/comunidades', {
                method: 'POST',
                headers:{
                  'Content-Type' : 'application/json'
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados)
                setComunidades([...comunidades, dados.registroCriado])
              })

              // comunidades.push('Alura Stars');
          }}>
            <div>
              <input placeHolder="Qual vai ser o nome da sua comunidade?" 
                name="title"
                aria-level="Qual vai ser o nome da sua comunidade?"
              />
            </div>
            <div>
              <input placeHolder="Coloque uma URL para usarmos de capa" 
                name="imageUrl"
                aria-level="Coloque uma URL para usarmos de capa"
              />
            </div>

            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>
      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBox title="Seguidores" items={seguidores} />
        
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
          Comunidades ({comunidades.length})
          </h2>
          <ul>
            {comunidades.map((pessoa) => {
              return (
                <li key={pessoa.id}>
                  <a href={`/communities/${pessoa.title}`} >
                    <img src={pessoa.imageUrl} />
                    <span>{pessoa.title}</span>
                  </a>
                </li>
              )
            }).slice(0, 6)}
          </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBox title="Pessoas da comunidades" items={pessoasFavoritas} />
      </div>
    </MainGrid>
    </>
  )
};