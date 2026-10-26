// "+966 50 123 4567" → "+966501234567" — tel: links must not contain spaces or brackets
export const telHref = (phone) => phone.replace(/[^\d+]/g, '');
