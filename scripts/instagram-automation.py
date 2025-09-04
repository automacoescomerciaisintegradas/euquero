#!/usr/bin/env python3
"""
Script de Automação do Instagram para EuQuero
Integração com instagrapi para automação de postagens
"""

import os
import sys
import json
import logging
from pathlib import Path
from typing import Dict, Any, Optional
from datetime import datetime

try:
    from instagrapi import Client
    from instagrapi.exceptions import LoginRequired, PleaseWaitFewMinutes, ChallengeRequired
except ImportError:
    print("Erro: instagrapi não está instalado. Execute: pip install instagrapi")
    sys.exit(1)

# Configuração de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('instagram_automation.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class InstagramAutomation:
    """Classe para automação do Instagram usando instagrapi"""
    
    def __init__(self):
        self.client = Client()
        self.logged_in = False
        
    def login(self, username: str, password: str) -> bool:
        """
        Realiza login no Instagram
        
        Args:
            username: Nome de usuário do Instagram
            password: Senha do Instagram
            
        Returns:
            bool: True se login foi bem-sucedido
        """
        try:
            # Tentar carregar sessão existente
            session_file = f"session_{username}.json"
            if os.path.exists(session_file):
                logger.info("Carregando sessão existente...")
                self.client.load_settings(session_file)
                
            # Fazer login
            self.client.login(username, password)
            
            # Salvar sessão
            self.client.dump_settings(session_file)
            
            self.logged_in = True
            logger.info(f"Login realizado com sucesso para {username}")
            return True
            
        except LoginRequired:
            logger.error("Login necessário - credenciais inválidas")
            return False
        except ChallengeRequired as e:
            logger.error(f"Desafio de segurança necessário: {e}")
            return False
        except PleaseWaitFewMinutes:
            logger.error("Muitas tentativas de login. Aguarde alguns minutos.")
            return False
        except Exception as e:
            logger.error(f"Erro durante login: {e}")
            return False
    
    def upload_photo(self, image_path: str, caption: str, hashtags: list = None) -> Optional[Dict[str, Any]]:
        """
        Faz upload de uma foto para o Instagram
        
        Args:
            image_path: Caminho para a imagem
            caption: Legenda da postagem
            hashtags: Lista de hashtags (opcional)
            
        Returns:
            Dict com informações da postagem ou None se falhou
        """
        if not self.logged_in:
            logger.error("Usuário não está logado")
            return None
            
        try:
            # Verificar se arquivo existe
            image_path = Path(image_path)
            if not image_path.exists():
                logger.error(f"Arquivo de imagem não encontrado: {image_path}")
                return None
            
            # Preparar legenda com hashtags
            full_caption = caption
            if hashtags:
                hashtag_text = " ".join([f"#{tag}" for tag in hashtags])
                full_caption = f"{caption}\n\n{hashtag_text}"
            
            # Fazer upload
            logger.info(f"Fazendo upload da imagem: {image_path}")
            media = self.client.photo_upload(
                path=image_path,
                caption=full_caption
            )
            
            result = {
                "success": True,
                "media_id": media.pk,
                "media_code": media.code,
                "caption": full_caption,
                "uploaded_at": datetime.now().isoformat()
            }
            
            logger.info(f"Upload realizado com sucesso! ID: {media.pk}")
            return result
            
        except PleaseWaitFewMinutes:
            logger.error("Limite de uploads atingido. Aguarde alguns minutos.")
            return None
        except Exception as e:
            logger.error(f"Erro durante upload: {e}")
            return None
    
    def upload_story(self, image_path: str) -> Optional[Dict[str, Any]]:
        """
        Faz upload de um story para o Instagram
        
        Args:
            image_path: Caminho para a imagem do story
            
        Returns:
            Dict com informações do story ou None se falhou
        """
        if not self.logged_in:
            logger.error("Usuário não está logado")
            return None
            
        try:
            image_path = Path(image_path)
            if not image_path.exists():
                logger.error(f"Arquivo de imagem não encontrado: {image_path}")
                return None
            
            logger.info(f"Fazendo upload do story: {image_path}")
            story = self.client.photo_upload_to_story(path=image_path)
            
            result = {
                "success": True,
                "story_id": story.pk,
                "uploaded_at": datetime.now().isoformat()
            }
            
            logger.info(f"Story enviado com sucesso! ID: {story.pk}")
            return result
            
        except Exception as e:
            logger.error(f"Erro durante upload do story: {e}")
            return None
    
    def get_account_info(self) -> Optional[Dict[str, Any]]:
        """
        Obtém informações da conta logada
        
        Returns:
            Dict com informações da conta ou None se falhou
        """
        if not self.logged_in:
            logger.error("Usuário não está logado")
            return None
            
        try:
            user_info = self.client.account_info()
            
            return {
                "user_id": user_info.pk,
                "username": user_info.username,
                "full_name": user_info.full_name,
                "followers_count": user_info.follower_count,
                "following_count": user_info.following_count,
                "media_count": user_info.media_count,
                "is_verified": user_info.is_verified,
                "is_business": user_info.is_business
            }
            
        except Exception as e:
            logger.error(f"Erro ao obter informações da conta: {e}")
            return None
    
    def logout(self):
        """Faz logout da conta"""
        try:
            if self.logged_in:
                self.client.logout()
                self.logged_in = False
                logger.info("Logout realizado com sucesso")
        except Exception as e:
            logger.error(f"Erro durante logout: {e}")

def main():
    """Função principal para execução via linha de comando"""
    if len(sys.argv) < 2:
        print("Uso: python instagram-automation.py <comando> [argumentos]")
        print("Comandos disponíveis:")
        print("  upload_photo <username> <password> <image_path> <caption> [hashtags]")
        print("  upload_story <username> <password> <image_path>")
        print("  account_info <username> <password>")
        sys.exit(1)
    
    command = sys.argv[1]
    automation = InstagramAutomation()
    
    try:
        if command == "upload_photo":
            if len(sys.argv) < 6:
                print("Uso: upload_photo <username> <password> <image_path> <caption> [hashtags]")
                sys.exit(1)
                
            username = sys.argv[2]
            password = sys.argv[3]
            image_path = sys.argv[4]
            caption = sys.argv[5]
            hashtags = sys.argv[6].split(",") if len(sys.argv) > 6 else None
            
            if automation.login(username, password):
                result = automation.upload_photo(image_path, caption, hashtags)
                print(json.dumps(result, indent=2))
            
        elif command == "upload_story":
            if len(sys.argv) < 5:
                print("Uso: upload_story <username> <password> <image_path>")
                sys.exit(1)
                
            username = sys.argv[2]
            password = sys.argv[3]
            image_path = sys.argv[4]
            
            if automation.login(username, password):
                result = automation.upload_story(image_path)
                print(json.dumps(result, indent=2))
            
        elif command == "account_info":
            if len(sys.argv) < 4:
                print("Uso: account_info <username> <password>")
                sys.exit(1)
                
            username = sys.argv[2]
            password = sys.argv[3]
            
            if automation.login(username, password):
                result = automation.get_account_info()
                print(json.dumps(result, indent=2))
        
        else:
            print(f"Comando desconhecido: {command}")
            sys.exit(1)
            
    finally:
        automation.logout()

if __name__ == "__main__":
    main()