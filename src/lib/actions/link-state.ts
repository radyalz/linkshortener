export type LinkActionState = {
  data: {
    slug: string;
  } | null;
  error: string | null;
};

export const initialLinkActionState: LinkActionState = {
  data: null,
  error: null,
};