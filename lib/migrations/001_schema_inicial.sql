-- =============================================
-- VEINTIOX — Esquema inicial de base de datos
-- =============================================

-- Extensiones
create extension if not exists "uuid-ossp";

-- =============================================
-- CATEGORIAS
-- =============================================
create table public.categorias (
  id          uuid primary key default uuid_generate_v4(),
  nombre      text not null,
  slug        text not null unique,
  descripcion text,
  imagen      text,
  orden       int not null default 0
);

-- =============================================
-- PRODUCTOS
-- =============================================
create table public.productos (
  id                  uuid primary key default uuid_generate_v4(),
  nombre              text not null,
  slug                text not null unique,
  descripcion         text not null default '',
  precio              numeric(10,2) not null,
  precio_comparacion  numeric(10,2),
  categoria_id        uuid not null references public.categorias(id) on delete restrict,
  imagenes            text[] not null default '{}',
  stock               int not null default 0,
  tallas_disponibles  text[] not null default '{}',
  activo              boolean not null default true,
  destacado           boolean not null default false,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index productos_categoria_id_idx on public.productos(categoria_id);
create index productos_slug_idx on public.productos(slug);

-- Auto-actualizar updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger productos_updated_at
  before update on public.productos
  for each row execute function public.handle_updated_at();

-- =============================================
-- KITS
-- =============================================
create table public.kits (
  id          uuid primary key default uuid_generate_v4(),
  nombre      text not null,
  slug        text not null unique,
  descripcion text not null default '',
  precio      numeric(10,2) not null,
  imagen      text not null default '',
  activo      boolean not null default true,
  created_at  timestamptz not null default now()
);

create table public.kit_items (
  id          uuid primary key default uuid_generate_v4(),
  kit_id      uuid not null references public.kits(id) on delete cascade,
  producto_id uuid not null references public.productos(id) on delete cascade,
  cantidad    int not null default 1,
  unique(kit_id, producto_id)
);

-- =============================================
-- DROPS
-- =============================================
create table public.drops (
  id           uuid primary key default uuid_generate_v4(),
  nombre       text not null,
  descripcion  text not null default '',
  fecha_inicio timestamptz not null,
  fecha_fin    timestamptz,
  activo       boolean not null default false,
  imagen       text,
  created_at   timestamptz not null default now()
);

create table public.drop_productos (
  id          uuid primary key default uuid_generate_v4(),
  drop_id     uuid not null references public.drops(id) on delete cascade,
  producto_id uuid not null references public.productos(id) on delete cascade,
  stock_drop  int not null default 0,
  vendidos    int not null default 0,
  unique(drop_id, producto_id)
);

-- =============================================
-- PEDIDOS
-- =============================================
create table public.pedidos (
  id                uuid primary key default uuid_generate_v4(),
  numero_pedido     text not null unique,
  cliente_nombre    text not null,
  cliente_email     text not null,
  cliente_telefono  text not null,
  direccion_calle   text not null,
  direccion_ciudad  text not null,
  direccion_estado  text not null,
  direccion_cp      text not null,
  subtotal          numeric(10,2) not null,
  envio             numeric(10,2) not null default 0,
  total             numeric(10,2) not null,
  metodo_pago       text not null check (metodo_pago in ('stripe','paypal','mercadopago')),
  pago_referencia   text,
  estado            text not null default 'pendiente' check (estado in ('pendiente','pagado','enviado','entregado','cancelado')),
  notas             text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create trigger pedidos_updated_at
  before update on public.pedidos
  for each row execute function public.handle_updated_at();

create table public.pedido_items (
  id          uuid primary key default uuid_generate_v4(),
  pedido_id   uuid not null references public.pedidos(id) on delete cascade,
  producto_id uuid references public.productos(id) on delete set null,
  kit_id      uuid references public.kits(id) on delete set null,
  nombre      text not null,
  precio      numeric(10,2) not null,
  cantidad    int not null default 1,
  talla       text,
  subtotal    numeric(10,2) not null
);

-- =============================================
-- USUARIOS ADMIN
-- =============================================
create table public.usuarios_admin (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  nombre     text not null,
  rol        text not null default 'visor' check (rol in ('admin','editor','visor')),
  activo     boolean not null default true,
  created_at timestamptz not null default now()
);

-- =============================================
-- EMAILS NOTIFÍCAME
-- =============================================
create table public.emails_notificame (
  id         uuid primary key default uuid_generate_v4(),
  email      text not null,
  drop_id    uuid references public.drops(id) on delete set null,
  created_at timestamptz not null default now(),
  unique(email, drop_id)
);

-- =============================================
-- CONFIGURACION DE TIENDA
-- =============================================
create table public.configuracion (
  id          uuid primary key default uuid_generate_v4(),
  clave       text not null unique,
  valor       text not null,
  descripcion text
);

-- Valores por defecto
insert into public.configuracion (clave, valor, descripcion) values
  ('envio_gratis_minimo', '999', 'Monto mínimo en MXN para envío gratis'),
  ('costo_envio', '150', 'Costo de envío estándar en MXN'),
  ('promo_bar_texto', 'ENVÍO GRATIS en compras mayores a $999 | Drops limitados cada semana', 'Texto de la barra promocional'),
  ('instagram_url', '', 'URL de Instagram'),
  ('tiktok_url', '', 'URL de TikTok'),
  ('facebook_url', '', 'URL de Facebook'),
  ('contacto_email', 'hola@veintiox.com', 'Email de contacto');

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

-- Habilitar RLS en todas las tablas
alter table public.categorias enable row level security;
alter table public.productos enable row level security;
alter table public.kits enable row level security;
alter table public.kit_items enable row level security;
alter table public.drops enable row level security;
alter table public.drop_productos enable row level security;
alter table public.pedidos enable row level security;
alter table public.pedido_items enable row level security;
alter table public.usuarios_admin enable row level security;
alter table public.emails_notificame enable row level security;
alter table public.configuracion enable row level security;

-- Lectura pública (tienda)
create policy "Lectura pública categorias" on public.categorias for select using (true);
create policy "Lectura pública productos activos" on public.productos for select using (activo = true);
create policy "Lectura pública kits activos" on public.kits for select using (activo = true);
create policy "Lectura pública kit_items" on public.kit_items for select using (true);
create policy "Lectura pública drops" on public.drops for select using (true);
create policy "Lectura pública drop_productos" on public.drop_productos for select using (true);
create policy "Lectura pública configuracion" on public.configuracion for select using (true);

-- Inserción pública (checkout y notifícame)
create policy "Insertar pedidos" on public.pedidos for insert with check (true);
create policy "Insertar pedido_items" on public.pedido_items for insert with check (true);
create policy "Insertar emails_notificame" on public.emails_notificame for insert with check (true);

-- Admin: acceso total via service role (bypass RLS desde API routes)
-- Las operaciones de admin usan SUPABASE_SERVICE_ROLE_KEY que bypasea RLS

-- =============================================
-- STORAGE BUCKETS
-- =============================================
-- Ejecutar en Supabase Dashboard > Storage:
-- 1. Crear bucket "productos" (público)
-- 2. Crear bucket "kits" (público)
-- 3. Crear bucket "drops" (público)
