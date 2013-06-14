all:
	./tools/deploy.sh
	cp -r webOS/ deploy/dash-weather-plus/

update:
	@git fetch upstream
	@git merge upstream/master

push: update
	@git push

commit:
	@git commit
	@git push

install: all
	@palm-install deploy/*.ipk

clean:
	@rm deploy/* || true

appid:
	@grep '"id"' appinfo.json | cut -d: -f2 | cut -d'"' -f2 > .appid

launch: install appid
	@palm-launch -i `cat .appid`

log: appid
	-palm-log -f `cat .appid` | sed -u									\
		-e 's/\[[0-9]*-[0-9]*:[0-9]*:[0-9]*\.[0-9]*\] [a-zA-Z]*: //'	\
		-e 's/indicated new content, but not active./\n\n\n/'

test: launch log
	@true

version:
	@cat appinfo.json| grep version | sed 's/.*:.*"\(.*\)".*/\1/' > .version

filename: version all appid
	@echo "`cat .appid`_`cat .version`_all.ipk" > .filename


.PHONY: clean

