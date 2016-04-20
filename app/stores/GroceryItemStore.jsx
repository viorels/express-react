var dispatcher = require('./../dispatcher.js');
var helper = require('./../helpers/RestHelper.js');

function GroceryItemStore() {
    var items = [];
    var listeners = [];
    var items_url = "api/items";

    helper.get(items_url)
        .then(function(data) {
            items = data;
            triggerListeners();
        });

    function getItems() {
        return items;
    }

    function addGroceryItem(item) {
        items.push(item);
        triggerListeners();
        helper.post(items_url, item);
    }

    function _getIndexOf(item) {
        var index;
        items.filter(function(_item, _index) {
            if (_item.name === item.name) {
                index = _index;
            };
        });
        return index;
    }

    function deleteGroceryItem(item) {
        items.splice(_getIndexOf(item), 1);
        triggerListeners();
    }

    function setGroceryItemBought(item, isBought) {
        var _item = items[_getIndexOf(item)];
        _item.purchased = isBought || false;
        triggerListeners();
    }

    function onChange(listener) {
        listeners.push(listener);
    }

    function triggerListeners() {
        listeners.forEach(function(listener) {
           listener(items.slice());
        });
    }

    dispatcher.register(function(event) {
        var split = event.type.split(':');
        if (split[0] === 'grocery-item') {
            switch(split[1]) {
                case "add":
                    addGroceryItem(event.payload);
                    break;
                case "delete":
                    deleteGroceryItem(event.payload);
                    break;
                case "buy":
                    setGroceryItemBought(event.payload, true);
                    break;
                case "unbuy":
                    setGroceryItemBought(event.payload, false);
                    break;
            }
        }
    })

    return {
        getItems: getItems,
        onChange: onChange,
    }
}

module.exports = new GroceryItemStore();
