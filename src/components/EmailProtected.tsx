import React, { useState, useEffect } from 'react';

interface EmailProtectedProps {
  user: string;
  domain: string;
  className?: string;
  subject?: string;
  body?: string;
  children?: React.ReactNode;
}

const EmailProtected: React.FC<EmailProtectedProps> = ({ 
  user, 
  domain, 
  className = "", 
  subject = "", 
  body = "",
  children 
}) => {
  const [email, setEmail] = useState<string>('');
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  useEffect(() => {
    // Decode email on component mount to prevent bot harvesting
    const decodedEmail = `${user}@${domain}`;
    setEmail(decodedEmail);
  }, [user, domain]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRevealed(true);
    
    // Create mailto link with optional subject and body
    const mailtoParams = new URLSearchParams();
    if (subject) mailtoParams.append('subject', subject);
    if (body) mailtoParams.append('body', body);
    
    const mailtoUrl = `mailto:${email}${mailtoParams.toString() ? '?' + mailtoParams.toString() : ''}`;
    window.location.href = mailtoUrl;
  };

  const displayEmail = isRevealed ? email : `${user}[at]${domain}`;

  return (
    <span 
      className={`cursor-pointer hover:underline ${className}`}
      onClick={handleClick}
      title={`Send email to ${email}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e as any);
        }
      }}
    >
      {children || displayEmail}
    </span>
  );
};

export default EmailProtected;