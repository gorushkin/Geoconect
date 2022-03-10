import path from 'path';

export const getPath = (value: string | undefined) => {
  const dirname = path.resolve();
  return value ? path.join(dirname, value) : undefined;
};
