import React from 'react';
import { Share2, Facebook, Twitter, MessageCircle, Link2, Mail } from 'lucide-react';

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, url, description }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    wechat: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`,
    copy: url
  };

  const handleShare = (platform: string) => {
    switch (platform) {
      case 'facebook':
      case 'twitter':
      case 'email':
        window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'width=600,height=400');
        break;
      case 'wechat':
        // Show QR code for WeChat sharing
        const qrWindow = window.open('', '_blank', 'width=300,height=300');
        if (qrWindow) {
          qrWindow.document.write(`
            <html>
              <head><title>WeChat Share</title></head>
              <body style="text-align: center; padding: 20px; font-family: Arial, sans-serif;">
                <h3>Scan QR Code to Share on WeChat</h3>
                <img src="${shareLinks.wechat}" alt="WeChat QR Code" style="border: 1px solid #ccc;" />
                <p style="margin-top: 10px; font-size: 12px; color: #666;">Scan with WeChat to share this article</p>
              </body>
            </html>
          `);
        }
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          alert('Link copied to clipboard!');
        }).catch(() => {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = url;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          alert('Link copied to clipboard!');
        });
        break;
    }
  };

  return (
    <div className="bg-gray-50 border-2 border-black p-6">
      <div className="flex items-center gap-2 mb-4">
        <Share2 size={20} className="text-black" />
        <h3 className="text-lg font-bold font-mono text-black">Share This Article</h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-mono text-sm hover:bg-blue-700 transition-colors border-2 border-blue-600"
          title="Share on Facebook"
        >
          <Facebook size={16} />
          Facebook
        </button>
        
        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white font-mono text-sm hover:bg-blue-500 transition-colors border-2 border-blue-400"
          title="Share on Twitter"
        >
          <Twitter size={16} />
          Twitter
        </button>
        
        <button
          onClick={() => handleShare('wechat')}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-mono text-sm hover:bg-green-600 transition-colors border-2 border-green-500"
          title="Share on WeChat"
        >
          <MessageCircle size={16} />
          WeChat
        </button>
        
        <button
          onClick={() => handleShare('email')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white font-mono text-sm hover:bg-gray-700 transition-colors border-2 border-gray-600"
          title="Share via Email"
        >
          <Mail size={16} />
          Email
        </button>
        
        <button
          onClick={() => handleShare('copy')}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-colors border-2 border-black"
          title="Copy Link"
        >
          <Link2 size={16} />
          Copy Link
        </button>
      </div>
      
      <p className="text-xs font-mono text-gray-600 mt-4">
        Help others discover this article by sharing it on your favorite platform!
      </p>
    </div>
  );
};

export default SocialShare;