export const idlFactory = ({ IDL }) => {
  const Item = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
  });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  return IDL.Service({
    'addItem' : IDL.Func([IDL.Text, IDL.Opt(IDL.Text)], [], []),
    'getAboutInfo' : IDL.Func([], [IDL.Text], ['query']),
    'getItems' : IDL.Func([], [IDL.Vec(Item)], ['query']),
    'getWelcomeMessage' : IDL.Func([], [IDL.Text], ['query']),
    'submitContactForm' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
