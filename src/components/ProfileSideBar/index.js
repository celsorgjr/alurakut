
import Box from '../Box';
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons';

export function ProfileSideBar(propriedades){
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.user}.png`} style={{ borderRadius: '8px' }} />
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.user}`}>
          @{propriedades.user}
        </a>
      </p>      
      <hr/>

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}