export function useJsonParse(str: string): any {
     let res = '';

     try {
          res = JSON.parse(str);
     } catch (error) {
          res = '';
          throw error;
     };

     return res;
};