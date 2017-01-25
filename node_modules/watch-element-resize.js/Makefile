ROOT_DIR	:= $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
NOW		:= $(shell date --iso=seconds)
SRC_DIR 	:= $(ROOT_DIR)/src
BUILD_DIR 	:= $(ROOT_DIR)/build

define GetFromPkg
$(shell node -p "require('./package.json').$(1)")
endef

LAST_VERSION	:= $(call GetFromPkg,version)
DESCRIPTION	:= $(call GetFromPkg,description)
PROJECT_URL	:= $(call GetFromPkg,homepage)

JS_DEBUG	:= $(ROOT_DIR)/$(call GetFromPkg,rollup.dest)
JS_FINAL	:= $(ROOT_DIR)/$(call GetFromPkg,main)

TMPFILE 	:= $(BUILD_DIR)/tmp
TEST_DIR 	:= $(ROOT_DIR)/test/spec/
TEST_INC_FILE 	:= $(ROOT_DIR)/test/include.js

NODE_MODULES	:= ./node_modules/.bin

ESLINT 		:= $(NODE_MODULES)/eslint
UGLIFYJS 	:= $(NODE_MODULES)/uglifyjs
UGLIFYJSFLAGS 	:= --mangle --mangle-regex --screw-ie8 -c warnings=false

NODEMON 	:= $(NODE_MODULES)/nodemon

ROLLUP	 	:= $(NODE_MODULES)/rollup
ROLLUPFLAGS 	:= -c config/rollup.config.js

CASPERJS 	:= $(NODE_MODULES)/casperjs
CASPERJSFLAGS 	:= test $(TEST_DIR) --includes=$(TEST_INC_FILE) --ssl-protocol=any --ignore-ssl-errors=true

define HEADER
/**
 * $(DESCRIPTION)
 * $(PROJECT_URL)
 * Version: v$(LAST_VERSION)
 * Built: $(NOW)
 */

endef
export HEADER

# targets
.PHONY: default
default: help

.PHONY: help
help:
	@echo
	@echo "The most common targets are:"
	@echo
	@echo "- install                 Install node dependencies"
	@echo "- build                   Build JavaScript and CSS files"
	@echo "- build-watch             Build files and watch for modifications"
	@echo "- test                    Run unit tests in the console"
	@echo "- help                    Display this help message"
	@echo
	@echo "Other less frequently used targets are:"
	@echo
	@echo "- lint                    Check the code with the linter"
	@echo "- build-js                Build JavaScript files"
	@echo "- ci                      Run the full continuous integration process"
	@echo

.PHONY: ci
ci: test

.PHONY: npm-install
npm-install: install

$(BUILD_DIR)/timestamps/node-modules-timestamp: package.json
	@mkdir -p $(@D)
	npm install
	@touch $@

.PHONY: install
install: $(BUILD_DIR)/timestamps/node-modules-timestamp

.PHONY: clean
clean:
	@rm -f $(BUILD_DIR)/timestamps/eslint-timestamp
	@rm -f $(JS_FINAL)
	@rm -f $(JS_DEBUG)

.PHONY: build-watch
build-watch: build watch

.PHONY: watch
watch: watch-js

.PHONY: build
build: install clean build-js

.PHONY: build-js
build-js: bundle-js lint uglifyjs add-js-header
	@echo `date +'%H:%M:%S'` "Build JS ... OK"

.PHONY: test
test: build
	@$(CASPERJS) $(CASPERJSFLAGS)

.PHONY: bundle-js
bundle-js:
	@$(ROLLUP) $(ROLLUPFLAGS)

$(BUILD_DIR)/timestamps/eslint-timestamp: $(SRC_DIR) \
					  $(ROOT_DIR)/test/ \
					  $(ROOT_DIR)/examples/
	@mkdir -p $(@D)
	@echo "Running eslint ..."
	@$(ESLINT) $^
	@touch $@

.PHONY: lint
lint: $(BUILD_DIR)/timestamps/eslint-timestamp

.PHONY: uglifyjs
uglifyjs: $(JS_DEBUG)
	@$(UGLIFYJS) $^ $(UGLIFYJSFLAGS) > $(JS_FINAL)

.PHONY: add-js-header-debug
add-js-header-debug: $(JS_DEBUG)
	@echo "$$HEADER" | cat - $^ > $(TMPFILE) && mv $(TMPFILE) $^

.PHONY: add-js-header-min
add-js-header-min: $(JS_FINAL)
	@echo "$$HEADER" | cat - $^ > $(TMPFILE) && mv $(TMPFILE) $^

.PHONY: add-js-header
add-js-header: add-js-header-debug add-js-header-min

.PHONY: watch-js
watch-js: $(SRC_DIR)
	@$(NODEMON) --on-change-only --watch $^ --ext js --exec "make build-js"

.DEFAULT_GOAL := default
