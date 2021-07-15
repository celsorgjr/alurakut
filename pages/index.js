import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/components/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSideBar(propriedades){
  return (
    <Box>
      <img src={`https://github.com/${propriedades.user}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'celsorgjr'
  const pessoasFavoritas = [
      'lluccia', 
      'peas', 
      'rafaballerini', 
      'juunegreiros',
      'filipedeschamps',
      'eduardopires'
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

          <OrkutNostalgicIconSet />
        </Box>
      </div>
      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da comunidades ({pessoasFavoritas.length})
          </h2>
          <ul>
            {pessoasFavoritas.map((pessoa) => {
              return (
                <li>
                  <a href={`/users/${pessoa}`} key={pessoa}>
                    <img src={`https://github.com/${pessoa}.png`} />
                    <span>{pessoa}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper >
        <Box>
          Comunidades
        </Box>
      </div>
    </MainGrid>
    </>
  )
}
