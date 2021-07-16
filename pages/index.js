import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/components/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { ProfileSideBar } from '../src/components/ProfileSideBar';

export default function Home() {
  const githubUser = 'celsorgjr';
  const [comunidades, setComunidades] = React.useState([{ 
    id: new Date().toISOString(), 
    title: 'Eu odeio acordar cedo', 
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg' 
  }]);
  
  const pessoasFavoritas = [
    'lluccia', 
    'peas', 
    'rafaballerini', 
    'juunegreiros',
    'filipedeschamps',
    'eduardopires',
    'andrebaltieri'
  ]

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
            Bem vindo (a)
          </h1>

          <OrkutNostalgicIconSet mensagens="1200" fas="500" fotos="10" recados="12" />
        </Box>

        <Box>
          <h2 className="subTitle">O que voce deseja fazer?</h2>
          <form onSubmit={function handleCriaComunidade(e){
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              };

              // comunidades.push('Alura Stars');
              setComunidades([...comunidades, comunidade])
              console.log(comunidades);
          }}>
            <div>
              <input placeHolder="Qual vai ser o nome da sua comunidade?" 
                name="title"
                aria-level="Qual vai ser o nome da sua comunidade?"
              />
            </div>
            <div>
              <input placeHolder="Coloque uma URL para usarmos de capa" 
                name="image"
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
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            comunidades ({comunidades.length})
          </h2>
          <ul>
            {comunidades.map((pessoa) => {
              return (
                <li key={pessoa.id}>
                  <a href={`/users/${pessoa.title}`} >
                    <img src={pessoa.image} />
                    <span>{pessoa.title}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da comunidades ({pessoasFavoritas.length})
          </h2>
          <ul>
            {pessoasFavoritas.map((pessoa) => {
              return (
                <li key={pessoa} >
                  <a href={`/users/${pessoa}`} >
                    <img src={`https://github.com/${pessoa}.png`} />
                    <span>{pessoa}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  )
};