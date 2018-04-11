GITDIST := git --git-dir=.git/worktrees/dist --work-tree dist

build: dist/
	npm run build

run:
	npm run serve

dist/: .git/worktrees/dist

.git/worktrees/dist:
	git worktree add --no-checkout ./dist gh-pages

status: .git/worktrees/dist
	$(GITDIST) status

deploy: .git/worktrees/dist build
	$(GITDIST) add .
	$(GITDIST) commit . -m "Deploy $(shell git describe --tags --dirty --always)" -e -v
	$(GITDIST) push origin gh-pages
