import dev from './dev';
import local from './local';
import prod from './prod';

const serverTypeMapping = { local, prod, dev };

export default serverTypeMapping[process.env.NEXT_PUBLIC_TYPE] || serverTypeMapping.local;
