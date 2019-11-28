/**
 * Created by Sameer on 2019/11/28.
 */
export default class Store{

    static init(component)
    {
       // Store.component = component;
    }

    static write(id, value) {

        console.log("Store write",id);
            let store = Store.store;
            store[id] = value;

    }
    static read(id) {
            let store = Store.store;
            return store[id];
    }
}
Store.store = {};
//Store.component = null;
