# BountyBox
![pipeline status](https://github.com/fa11ingsky/collectorscache/actions/workflows/node.js.yml/badge.svg)

Bounty Box by ArmourScope

Build and run local dev environment: 
```
npm install
npm run dev
```

For new deployments. Push /dist to the gh-pages branch after a fresh build.
```bash
# From main branch
git checkout main
git pull
# Build project
npm run build
cp CNAME dist/
# Commit /dist
git commit dist -m "Deployment"
# Force push the subtree
$out = git subtree split --prefix dist main
git push origin $out:gh-pages --force
```