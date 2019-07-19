# neomem grammar
# parse with nearley

# @builtin "whitespace.ne" # `_` means arbitrary amount of whitespace

# main -> block:*
# block -> _ line name line props contents props _ {% d => d.join('\n') %}
block -> line name line props contents {% d=>`{${d[1]}, ${d[3]}, ${d[4]}}` %}
line -> "----" "-":* "\n"   {% d=>null %}
name -> [a-z ]:+ "\n"   {% d => `"name":"${d[0].join('')}"` %}
props -> prop:* {% d=>d[0].join(', ') %}
prop -> [a-z]:+ [:] [a-z0-9 ]:+ "\n"   {% d => `"${d[0].join('').trim()}":"${d[2].join('').trim()}"` %}
contents -> [^:]:+ "\n"   {% d => `"description": "${d[0].join('')}"` %}
