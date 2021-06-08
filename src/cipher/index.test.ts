import * as cipher from './index';

it('Should work on a simple text', () => {
    expect(cipher.decrypt(123, cipher.encrypt(123, 'wow'))).toEqual('wow');
});

it('Should work on an empty text', () => {
    expect(cipher.decrypt(123, cipher.encrypt(123, ' '))).toEqual(' ');
});

it('Should work on a long text with random number', () => {
    const num = Math.floor(Math.random() * 100000);
    expect(cipher.decrypt(num, 
                cipher.encrypt(num, 
                        'okay this is a long text and it should work well')))
                .toEqual('okay this is a long text and it should work well');
});

it('Should work on a text with special characters', () => {
    const num = Math.floor(Math.random() * 100000);
    expect(cipher.decrypt(num, cipher.encrypt(num, 'okay@#$%^&wow')))
                        .toEqual('okay@#$%^&wow');
});