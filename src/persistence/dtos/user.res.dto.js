export default class UserResDTO{
    constructor(user){
        this.nombre=user.first_name,
        this.email = user.email;
        this.rol=user.role
        this.carrito=user.cart
    }
}
