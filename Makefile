list:
	@echo "install"

install:
	npm install -g nodemon babel-cli gulp sequelize-cli mysql git://github.com/AlloVince/sequelize-auto#feature/column-comments

sequelize-auto:
	sequelize-auto -o "./src/models" -d fmarket -h localhost -u root -x my_password -e mysql

