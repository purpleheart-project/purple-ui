import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { githubLight } from '@uiw/codemirror-theme-github';
import { useCallback } from 'react';
import { javascript } from '@codemirror/lang-javascript';
import { useMount } from 'ahooks';
import { runTestScript } from 'purpleheart-js-sandbox';

const cmValue = `    pw.test("Arithmetic operations and toBe", () => {
      const size = 500 + 500;
      pw.expect(size).toBe(1000);
      pw.expect(size - 500).toBe(500);
      pw.expect(size * 4).toBe(4000);
      pw.expect(size / 4).toBe(250);
    });
    pw.test("toBeLevelxxx", () => {
      pw.expect(200).toBeLevel2xx();
      pw.expect(204).toBeLevel2xx();
      pw.expect(300).not.toBeLevel2xx();
      pw.expect(300).toBeLevel3xx();
      pw.expect(304).toBeLevel3xx();
      pw.expect(204).not.toBeLevel3xx();
      pw.expect(401).toBeLevel4xx();
      pw.expect(404).toBeLevel4xx();
      pw.expect(204).not.toBeLevel4xx();
      pw.expect(501).toBeLevel5xx();
      pw.expect(504).toBeLevel5xx();
      pw.expect(204).not.toBeLevel5xx();
    });
    pw.test("toBeType", () => {
      pw.expect("hello").toBeType("string");
      pw.expect(10).toBeType("number");
      pw.expect(true).toBeType("boolean");
      pw.expect("deffonotanumber").not.toBeType("number");
    });
    pw.test("toHaveLength", () => {
      const arr = [1, 2, 3];
      pw.expect(arr).toHaveLength(3);
      pw.expect(arr).not.toHaveLength(4);
    });`;
const RequestPage = () => {
  const onChange = useCallback((value, viewUpdate) => {
    console.log('value:', value);
  }, []);
  useMount(() => {
    runTestScript(cmValue, {
      status: 200,
      body: 'hoi',
      headers: [],
    })().then((res) => {
      console.log(res);
    });
  });
  return (
    <div className={'test123'}>
      <CodeMirror
        theme={githubLight}
        value={cmValue}
        height='200px'
        extensions={[javascript()]}
        onChange={onChange}
      />
    </div>
  );
};

export default RequestPage;
