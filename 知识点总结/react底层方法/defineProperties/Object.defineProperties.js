var book = {};
Object.defineProperties(book, {
    _year:{
        writable: true,
        value: 2004,
    },
    edition: {
        writable: true,
        value: 1,
    },
    year: {
        get: function() {
            return this._year;
        },
        set: function(newValue) {
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
})

// book.year=2005;
book.year=2006;
console.log(book, '-----book---');
