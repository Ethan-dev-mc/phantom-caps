export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type Database = {
  public: {
    Tables: {
      categorias: {
        Row: {
          id: string
          nombre: string
          slug: string
          descripcion: string | null
          imagen: string | null
          orden: number
        }
        Insert: Omit<Database['public']['Tables']['categorias']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['categorias']['Insert']>
      }
      productos: {
        Row: {
          id: string
          nombre: string
          slug: string
          descripcion: string
          precio: number
          precio_comparacion: number | null
          categoria_id: string
          imagenes: string[]
          stock: number
          tallas_disponibles: string[]
          activo: boolean
          destacado: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['productos']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['productos']['Insert']>
      }
      kits: {
        Row: {
          id: string
          nombre: string
          slug: string
          descripcion: string
          precio: number
          imagen: string
          activo: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['kits']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['kits']['Insert']>
      }
      kit_items: {
        Row: {
          id: string
          kit_id: string
          producto_id: string
          cantidad: number
        }
        Insert: Omit<Database['public']['Tables']['kit_items']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['kit_items']['Insert']>
      }
      drops: {
        Row: {
          id: string
          nombre: string
          descripcion: string
          fecha_inicio: string
          fecha_fin: string | null
          activo: boolean
          imagen: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['drops']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['drops']['Insert']>
      }
      drop_productos: {
        Row: {
          id: string
          drop_id: string
          producto_id: string
          stock_drop: number
          vendidos: number
        }
        Insert: Omit<Database['public']['Tables']['drop_productos']['Row'], 'id' | 'vendidos'>
        Update: Partial<Database['public']['Tables']['drop_productos']['Insert']>
      }
      pedidos: {
        Row: {
          id: string
          numero_pedido: string
          cliente_nombre: string
          cliente_email: string
          cliente_telefono: string
          direccion_calle: string
          direccion_ciudad: string
          direccion_estado: string
          direccion_cp: string
          subtotal: number
          envio: number
          total: number
          metodo_pago: 'stripe' | 'paypal' | 'mercadopago'
          pago_referencia: string | null
          estado: 'pendiente' | 'pagado' | 'enviado' | 'entregado' | 'cancelado'
          notas: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['pedidos']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['pedidos']['Insert']>
      }
      pedido_items: {
        Row: {
          id: string
          pedido_id: string
          producto_id: string | null
          kit_id: string | null
          nombre: string
          precio: number
          cantidad: number
          talla: string | null
          subtotal: number
        }
        Insert: Omit<Database['public']['Tables']['pedido_items']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['pedido_items']['Insert']>
      }
      usuarios_admin: {
        Row: {
          id: string
          email: string
          nombre: string
          rol: 'admin' | 'editor' | 'visor'
          activo: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['usuarios_admin']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['usuarios_admin']['Insert']>
      }
      emails_notificame: {
        Row: {
          id: string
          email: string
          drop_id: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['emails_notificame']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['emails_notificame']['Insert']>
      }
      configuracion: {
        Row: {
          id: string
          clave: string
          valor: string
          descripcion: string | null
        }
        Insert: Omit<Database['public']['Tables']['configuracion']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['configuracion']['Insert']>
      }
    }
  }
}

// Helpers de tipos de fila
export type Categoria = Database['public']['Tables']['categorias']['Row']
export type Producto = Database['public']['Tables']['productos']['Row']
export type Kit = Database['public']['Tables']['kits']['Row']
export type KitItem = Database['public']['Tables']['kit_items']['Row']
export type Drop = Database['public']['Tables']['drops']['Row']
export type DropProducto = Database['public']['Tables']['drop_productos']['Row']
export type Pedido = Database['public']['Tables']['pedidos']['Row']
export type PedidoItem = Database['public']['Tables']['pedido_items']['Row']
export type UsuarioAdmin = Database['public']['Tables']['usuarios_admin']['Row']
export type EmailNotificame = Database['public']['Tables']['emails_notificame']['Row']
export type Configuracion = Database['public']['Tables']['configuracion']['Row']

// Tipos extendidos con joins
export type ProductoConCategoria = Producto & { categorias: Categoria }
export type KitConItems = Kit & { kit_items: (KitItem & { productos: Producto })[] }
export type DropConProductos = Drop & { drop_productos: (DropProducto & { productos: Producto })[] }
export type PedidoConItems = Pedido & { pedido_items: PedidoItem[] }
