import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';

import { showError } from './utils/utils';
import { rawFileAtom, messagesAtom } from './stores/global';
import Dropzone from './components/Dropzone/Dropzone';
import MessageViewer from './components/MessageViewer/MessageViewer';
import Sidebar from './components/Sidebar/Sidebar';
import * as S from './style';

function App() {
  const messages = useAtomValue(messagesAtom);
  const setRawFile = useSetAtom(rawFileAtom);

  const processFile = (file: File) => {
    if (!file) return;

    // Criar URL para download do arquivo original
    (window as any).uploadedFileUrl = URL.createObjectURL(file);

    const reader = new FileReader();

    reader.addEventListener('loadend', e => {
      if (e.target) {
        setRawFile(e.target.result);
      }
    });

    if (/^application\/(?:x-)?zip(?:-compressed)?$/.test(file.type)) {
      reader.readAsArrayBuffer(file);
    } else if (file.type === 'text/plain') {
      reader.readAsText(file);
    } else {
      showError(`Tipo de arquivo ${file.type} não suportado`);
    }
  };

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) =>
      document.documentElement.classList.toggle('ctrl-down', e.ctrlKey);

    document.addEventListener('keydown', keyHandler);
    document.addEventListener('keyup', keyHandler);

    return () => {
      document.removeEventListener('keydown', keyHandler);
      document.removeEventListener('keyup', keyHandler);
    };
  }, []);

  return (
    <>
      <S.GlobalStyles />
      <S.Container>
        <S.AppHeader>
          <S.Logo>
            <span role="img" aria-label="chat">
              💬
            </span>{' '}
            Olha.Isso
          </S.Logo>
          <S.Subtitle>Visualizador de Conversas WhatsApp</S.Subtitle>
        </S.AppHeader>
        <S.Header>
          <Dropzone onFileUpload={processFile} id="dropzone" />
          {messages.length > 0 && (
            <>
              <span>ou</span>
              <a
                href={(window as any).uploadedFileUrl || '#'}
                download={(window as any).uploadedFileName || 'chat.zip'}
                onClick={e => {
                  if (!(window as any).uploadedFileUrl) {
                    e.preventDefault();
                    alert('Faça upload de um arquivo primeiro');
                  }
                }}
              >
                Baixar arquivo original
              </a>
            </>
          )}
        </S.Header>
        <MessageViewer />
        {messages.length > 0 && <Sidebar />}
        {messages.length === 0 && (
          <S.WelcomeSection>
            <S.WelcomeTitle>Bem-vindo ao Olha.Isso</S.WelcomeTitle>
            <S.WelcomeText>
              Este aplicativo permite visualizar suas conversas do WhatsApp de
              forma organizada.
            </S.WelcomeText>
            <S.InstructionsList>
              <li>
                <strong>1. Exporte sua conversa</strong>
                <p>
                  No WhatsApp, abra a conversa e vá em Mais opções → Exportar
                  conversa
                </p>
              </li>
              <li>
                <strong>2. Escolha incluir mídia</strong>
                <p>
                  Para ver fotos, vídeos e áudios, selecione &quot;Incluir
                  mídia&quot;
                </p>
              </li>
              <li>
                <strong>3. Faça o upload</strong>
                <p>Arraste o arquivo .zip ou .txt para a área acima</p>
              </li>
              <li>
                <strong>4. Visualize e exporte</strong>
                <p>Use o menu lateral para filtrar e exportar em HTML</p>
              </li>
            </S.InstructionsList>
            <S.Footer>
              <strong>Serra & Tuaf Advogados</strong>
              <br />
              Soluções jurídicas digitais
            </S.Footer>
          </S.WelcomeSection>
        )}
      </S.Container>
    </>
  );
}

export default App;
