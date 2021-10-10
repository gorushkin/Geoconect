import local from './local';
import prod from './prod';

const serverTypeMapping = { local, prod };

export default serverTypeMapping[process.env.NEXT_PUBLIC_TYPE] || serverTypeMapping.local;
