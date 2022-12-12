import chatWindow from './components/chatwindow/chatWindow';
import chatConfig from './components/chatwindow/config/kore-config';

import Korei18nPlugin from './plugins/i18n';
import KoreFileUploaderPlugin from './plugins/fileUploader/fileUploader';
import KorePickersPlugin from './plugins/korePickers';
import GraphTemplatesPlugin from './plugins/graphTemplatesPlugin';
import WebKitSTT from './plugins/speechToText/WebKitSTT/WebKitSTT';
import GoogleSTT from './plugins/speechToText/GoogleSTT/GoogleSTT';
import AzureSTT from './plugins/speechToText/AzureSTT/AzureSTT';
import BrowserTTS from './plugins/textToSpeech/BrowserTTS/BrowserTTS';
import AzureTTS from './plugins/textToSpeech/AzureTTS/AzureTTS';
// import AgentDesktopPlugin from './plugins/agentDesktop/agentdesktop';
//import speakTextWithAWSPolly from './plugins/TTSPlugins/KoreAWSPollyPlugin/kore-aws-polly';
import AgentDesktopPlugin from './plugins/agentDesktop/agentdesktop';
import WebKitSTTConfig from './plugins/speechToText/WebKitSTT/WebKitSTT';
import KoreWidgetSDK from './components/widgets/kore-widgets';
import widgetsConfig from './components/widgets/config/kore-widgets-config';
import GoogleSTTConfig from './plugins/speechToText/GoogleSTT/GoogleSTT';
import AzureSTTConfig from './plugins/speechToText/AzureSTT/AzureSTT';
import AzureTTSConfig  from './plugins/textToSpeech/AzureTTS/AzureTTS';
import GoogleTTS from './plugins/textToSpeech/GoogleTTS/GoogleTTS';
import GoogleTTSConfig from './plugins/textToSpeech/GoogleTTS/GoogleTTS';
import GoogleVoiceConfig from  './plugins/textToSpeech/GoogleTTS/GoogleTTS';
import GoogleAudioConfig from  './plugins/textToSpeech/GoogleTTS/GoogleTTS';

export {
  chatConfig,
  chatWindow,
  widgetsConfig,
  KoreWidgetSDK,
  Korei18nPlugin,
  KoreFileUploaderPlugin,
  KorePickersPlugin,
  GraphTemplatesPlugin,
  WebKitSTT,
  GoogleSTT,
  AzureSTT,
  BrowserTTS,
  AzureTTS,
  GoogleSTTConfig,
  AzureSTTConfig,
  AzureTTSConfig,
  WebKitSTTConfig,
  GoogleTTS,
  GoogleTTSConfig,
  GoogleVoiceConfig,
  GoogleAudioConfig,
  //speakTextWithAWSPolly,
  AgentDesktopPlugin
};
