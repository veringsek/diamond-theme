const fs = require('fs');

let string = fs.readFileSync('diamond.omp.json', { encoding: 'utf8' });
let replacements = {
    Host: /\{\{\s*\.HostName\s*\}\}/g,
    '$1$2Admin{{ else }}User$3': /(\{\{\s*if\s+.Root\s*\}\})([^{]+)(\{\{\s*end\s*\}\}.*)\{\{\s*\.UserName\s*\}\}/g,
    '$1$2$6Admin$3$4$6User$5': /(\{\{\s*if\s+.Root\s*\}\})([^{]+)(\{\{\s*else\s*\}\})([^{]+)(\{\{\s*end\s*\}\})(.*)\{\{\s*\.UserName\s*\}\}/g,
    '"tone": "#0099F8"': /"tone":\s*"accent"/g
};
for (let replacer in replacements) {
    let pattern = replacements[replacer];
    string = string.replace(pattern, replacer);
}
fs.writeFileSync('tools/diamond.omp.json', string);