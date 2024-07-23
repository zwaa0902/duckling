import dev from './dev.json';
import prod from './prod.json';

export default import.meta.env.DEV ? dev : prod;
