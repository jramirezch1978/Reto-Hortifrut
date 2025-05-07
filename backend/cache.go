package main

import (
	"sync"
	"time"
)

type cacheItem struct {
	data      interface{}
	expiresAt time.Time
}

type Cache struct {
	items map[string]cacheItem
	mutex sync.Mutex
	ttl   time.Duration
}

func NewCache(ttl time.Duration) *Cache {
	return &Cache{
		items: make(map[string]cacheItem),
		ttl:   ttl,
	}
}

func (c *Cache) Get(key string) (interface{}, bool) {
	c.mutex.Lock()
	defer c.mutex.Unlock()
	item, found := c.items[key]
	if !found || time.Now().After(item.expiresAt) {
		return nil, false
	}
	return item.data, true
}

func (c *Cache) Set(key string, data interface{}) {
	c.mutex.Lock()
	defer c.mutex.Unlock()
	c.items[key] = cacheItem{
		data:      data,
		expiresAt: time.Now().Add(c.ttl),
	}
}

func (c *Cache) Delete(key string) {
	c.mutex.Lock()
	defer c.mutex.Unlock()
	delete(c.items, key)
}
