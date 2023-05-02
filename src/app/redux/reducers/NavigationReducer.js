import { navigations } from '../../navigations';
import { SET_USER_NAVIGATION } from '../actions/NavigationAction';
import { GET_UNREAD_DATA } from '../constant';

const initialState = [...navigations];

const NavigationReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_USER_NAVIGATION: {
            return [...action.payload];
        }
        case GET_UNREAD_DATA: {
            let newNav = state?.map((item) => {
                if (
                    item.name === 'Data Desa' &&
                    action?.payload?.desa_pending
                ) {
                    return {
                        ...item,
                        badge: {
                            value: action?.payload?.desa_pending,
                            color: 'danger text-white'
                        }
                    };
                } else if (
                    item.name === 'Produk' &&
                    action?.payload?.orders_pending
                ) {
                    return {
                        ...item,
                        badge: {
                            value: action?.payload?.orders_pending,
                            color: 'danger text-white'
                        },
                        children: item.children?.map((item) => {
                            if (item.name === 'Pesanan') {
                                return {
                                    ...item,
                                    badge: {
                                        value: action?.payload?.orders_pending,
                                        color: 'danger text-white'
                                    }
                                };
                            } else {
                                return item;
                            }
                        })
                    };
                } else if (
                    item.name === 'Ganti Domain' &&
                    action?.payload?.domain_pending
                ) {
                    return {
                        ...item,
                        badge: {
                            value: action?.payload?.domain_pending,
                            color: 'danger text-white'
                        },
                        children: item.children?.map((item) => {
                            if (item.name === 'Ganti Domain') {
                                return {
                                    ...item,
                                    badge: {
                                        value: action?.payload?.domain_pending,
                                        color: 'danger text-white'
                                    }
                                };
                            } else {
                                return item;
                            }
                        })
                    };
                } else {
                    return item;
                }
            });
            return newNav;
        }
        default: {
            return [...state];
        }
    }
};

export default NavigationReducer;
